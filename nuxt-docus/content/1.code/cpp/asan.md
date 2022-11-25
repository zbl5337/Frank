# 内存检测
内存检测  
`valgrind --tool=memcheck --leak-check=full --show-reachable=yes --trace-children=yes`

`valgrind --tool=memcheck --leak-check=full --show-reachable=yes --log-file=/home/oracle/works/nextpage2/bin/leak.log ./netaudit`

`AddressSanitizer`: 
编译代码时用`-fsanitize=address`就能打开AddressSanitizer工具，为了在检测到内存错误时打印出您的程序调用栈，需要在编译时加上选项`-fno-omit-frame-pointer`选项，同时为了得出更清晰的调用栈信息，请用`-O1`选项编译程序。

`yum install libasan`

http://mirror.centos.org/centos/7/os/x86_64/Packages/libasan-4.8.5-44.el7.x86_64.rpm

Linux下内存检测工具：`asan`

> ASAN（Address-Sanitizier）早先是LLVM中的特性，后被加入GCC 4.8，在GCC 4.9后加入对ARM平台的支持。因此GCC
> 4.8以上版本使用ASAN时不需要安装第三方库，通过在编译时指定编译CFLAGS即可打开开关。

- 编译选项
    1. Gcc编译选项

    ```shell
    # -fsanitize=address：开启内存越界检测
    # -fsanitize-recover=address：一般后台程序为保证稳定性，不能遇到错误就简单退出，而是继续运行，采用该选项支持内存出错之后程序继续运行，需要叠加设置ASAN_OPTIONS=halt_on_error=0才会生效；若未设置此选项，则内存出错即报错退出
    ```

    `ASAN_CFLAGS += -fsanitize=address -fsanitize-recover=address`

    ```shell
    # -fno-stack-protector：去使能栈溢出保护
    # -fno-omit-frame-pointer：去使能栈溢出保护
    # -fno-var-tracking：默认选项为-fvar-tracking，会导致运行非常慢
    # -g1：表示最小调试信息，通常debug版本用-g即-g2
    ```

    `ASAN_CFLAGS += -fno-stack-protector -fno-omit-frame-pointer -fno-var-tracking -g1`

    2. Ld链接选项
    `ASAN_LDFLAGS += -fsanitize=address -g1`
    如果使用gcc链接，此处可忽略。
- ASAN运行选项
    1. ASAN_OPTIONS设置
    ASAN_OPTIONS是Address-Sanitizier的运行选项环境变量。

    ```shell
    # halt_on_error=0：检测内存错误后继续运行
    # detect_leaks=1:使能内存泄露检测
    # malloc_context_size=15：内存错误发生时，显示的调用栈层数为15
    # log_path=/home/xos/asan.log:内存检查问题日志存放文件路径
    # suppressions=$SUPP_FILE:屏蔽打印某些内存错误
    ```

    `export ASAN_OPTIONS=halt_on_error=0:use_sigaltstack=0:detect_leaks=1:malloc_context_size=15:log_path=/home/xos/asan.log:suppressions=$SUPP_FILE`

    除了上述常用选项，以下还有一些选项可根据实际需要添加：

    ```shell
    # detect_stack_use_after_return=1：检查访问指向已被释放的栈空间
    # handle_segv=1：处理段错误；也可以添加handle_sigill=1处理SIGILL信号
    # quarantine_size=4194304:内存cache可缓存free内存大小4M
    ```

    `ASAN_OPTIONS=${ASAN_OPTIONS}:verbosity=0:handle_segv=1:allow_user_segv_handler=1:detect_stack_use_after_return=1:fast_unwind_on_fatal=1:fast_unwind_on_check=1:fast_unwind_on_malloc=1:quarantine_size=4194304`

    2. LSAN_OPTIONS设置  
    LSAN_OPTIONS是LeakSanitizier运行选项的环境变量，而LeakSanitizier是ASAN的内存泄漏检测模块，常用运行选项有：

    ```shell
    # exitcode=0：设置内存泄露退出码为0，默认情况内存泄露退出码0x16
    # use_unaligned=4：4字节对齐
    ```

    `export LSAN_OPTIONS=exitcode=0:use_unaligned=4`
- 总结
    实际开发环境中，可能存在gcc版本低，使用asan做内存检查时，需要链接libasan.so库的情况。其次，平台软件通常都会内部实现一套内存操作接口，为使用asan工具，需要替换成glibc提供的接口。此时，可以通过LD_PRELOAD环境变量解决这类问题。  
    `export LD_PRELOAD= libasan.so.2:libprelib.so #vos_malloc --> malloc`

