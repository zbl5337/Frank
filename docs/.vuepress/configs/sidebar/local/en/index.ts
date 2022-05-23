import {SidebarConfigArray} from "@vuepress/theme-default/lib/shared/nav";

const url_prefix = ''

export const sidebar_en_life: SidebarConfigArray = [
  {
    text: 'Life',
    collapsible: false,
    children: [
      url_prefix + '/life/',
      url_prefix + '/life/features-overview',
    ]
  },
  {
    text: 'Social',
    collapsible: false,
    children: [
      url_prefix + '/life/social/',
    ]
  },
  {
    text: 'Accident',
    collapsible: false,
    children: [
      url_prefix + '/life/social/accident/2018-Chongqing-bus-crash',
      url_prefix + '/life/social/accident/2020-Anshun-bus-crash',
      url_prefix + '/life/social/accident/2022-China-Eastern-Airlines-Flight-5735',
    ]
  },
  {
    text: 'Memory',
    collapsible: false,
    children: [
      url_prefix + '/life/memory/',
    ]
  },
  {
    text: 'FAQ',
    collapsible: false,
    children: [
      url_prefix + '/life/FAQ/wrong-temp',
    ],
  },
]

export const sidebar_en_code: SidebarConfigArray = [
  {
    text: 'Code',
    collapsible: false,
    children: [
      url_prefix + '/code/',
      url_prefix + '/code/audition/',
    ]
  },
  {
    text: 'Audition',
    collapsible: false,
    children: [
      url_prefix + '/code/audition/problems',
      url_prefix + '/code/audition/cpp',
      url_prefix + '/code/audition/algorithm',
      url_prefix + '/code/audition/os',
      url_prefix + '/code/audition/network_protocol',
      url_prefix + '/code/audition/database',
      url_prefix + '/code/audition/java',
      url_prefix + '/code/audition/front_end',
      url_prefix + '/code/audition/sys_design',
      url_prefix + '/code/audition/non_tech',
    ]
  },
]

export const sidebar_en_development: SidebarConfigArray = [
  {
    text: 'Guide',
    collapsible: false,
    children: []
  },
  {
    text: 'Structure',
    collapsible: false,
    children: [
      url_prefix + '/development/struct',
    ],
  },
]