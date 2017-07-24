


export interface iGetSearch {
  offset?: number
  pageSize?: number
  resultSize?: number
  results?: iNewsContentItem[]
  totalHits?: number
  warnings?: string[]
}
export type iGetCollectionSearch = iGetSearch
export type iGetCollectionRetrieve = iGetSearch
export type iGetRetrieve = iGetSearch
export type iGetCategoryList = iGetSearch


export interface iNewsContentItem {
  authors: Array<number>
  body: string
  categories: Array<number>
  contentType: string
  dateCreated: string
  dateLive: string
  dateUpdated: string
  description: string
  domainLinks: Array<number>
  domainOriginUpdated: string
  domains: Array<number>
  format: string
  height: number
  id: ID
  imageName: string
  imageType: string
  keywords: Array<number>
  link: string
  locationGeoPoints: Array<number>
  origin: string
  originId: string
  originalSource: string
  related: Array<number>
  revision: number
  sourceImageId: string
  status: string
  subtitle: string
  systemOriginUpdated: string
  title: string
  urlTitle: string
  userOriginUpdated: string
  version: string
  width: number
}

export interface iNewsStory {
  authorProfileIds?: Array<any>
  authors?: Array<string>
  body?: string
  bulletList?: Array<string>
  byline?: string
  bylineNames?: Array<string>
  bylineTitles?: Array<any>
  categories?: Array<ID>
  channel?: string
  commentsAllowed?: boolean
  commentsShown?: boolean
  commentsTotal?: number
  contentType?: string
  creditedSource?: string
  customDate?: string
  dateCreated?: string
  dateLive?: string
  dateUpdated?: string
  description?: string
  domainLinks?: Array<string>
  domainOriginUpdated?: string
  domains?: Array<string>
  id?: ID
  keywords?: Array<string>
  kicker?: string
  link?: string
  locationGeoPoints?: Array<{
    longitude?: number
    latitude?: number
  }>
  origin?: string
  originId?: string
  originalAssetId?: string
  originalSource?: string
  paidStatus?: string
  primaryCategory?: {
    id?: string
    isDominant?: boolean
    link?: string
    value?: string
  }
  references?: Array<iReferences>
  related?: Array<any>
  revision?: number
  seoHeadline?: string
  standFirst?: string
  status?: string
  subtitle?: string
  systemOriginUpdated?: string
  thumbnailImage?: {
    authors?: Array<string>
    categories?: Array<ID>
    contentType?: string
    cropName?: string
    dateCreated?: string
    dateLive?: string
    dateUpdated?: string
    description?: string
    domainLinks?: Array<any>
    domainOriginUpdated?: string
    domains?: Array<any>
    enterpriseAssetId?: string
    format?: string
    height?: number
    id?: ID
    imageName?: string
    imageType?: string
    keywords?: Array<any>
    link?: string
    locationGeoPoints?: Array<any>
  }
  title?: string
  urlTitle?: string
  userOriginUpdated?: string
  version?: string
}


export interface ID {
  link: string
  value: string
  selected?: string
  id?: string
  isDominant?: boolean
}

export interface iReferences {
  contentType: string
  id: ID
  origin: string
  originId: string
  referenceType: string
}
