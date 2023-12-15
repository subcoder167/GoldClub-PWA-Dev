import { gql } from "@apollo/client"
import { BASIC_PRODUCT_FIELDS, SELECTED_ATTRIBUTE, PRICE, PRODUCT_VARIANT_FIELDS, PRODUCT_PRICING_FIELD } from "./Fragments"
import { TbExposureOff } from "react-icons/tb"

export const GET_STORE_DETAILS = gql`
query storeDetails($domain:String!){
  storeDetails(domain:{
    domain:$domain
  }){
    id
    name
    domain
    storePhoneNumber
    userId
    storeLogo
    user{
      id
      facebookLink
      youtubeLink
      instagramLink
      phoneNumber
      showProductPrices
      addresses{
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country{
          code
          country
        }
        countryArea
        phone
        latitude
        longitude
        isDefaultShippingAddress
        isDefaultBillingAddress
      }
    }
    metalRates{
      id
      name
      gold24kRate
      gold24kPremium
      gold22kRate
      gold22kPremium
      gold20kRate
      gold20kPremium
      gold18kRate
      gold18kPremium
      gold14kRate
      gold14kPremium
      gold9kRate
      gold9kPremium
      silver999kRate
      silver999kPremium
      silver990kRate
      silver990kPremium
      silver970kRate
      silver970kPremium
      silver925kRate
      silver925kPremium
      silver700kRate
      silver700kPremium
      silver600kRate
      silver600kPremium
      silver500kRate
      silver500kPremium
      silver450kRate
      silver450kPremium
      platinum999kRate
      platinum999kPremium
      platinum950kRate
      platinum950kPremium
      platinum900kRate
      platinum900kPremium
      diamondRate
    }

  }
}`
export const GET_SHOP = gql`
query GetShop {
      shop {
        displayGrossPrices
    defaultCountry {
          code
      country
      __typename
    }
    countries {
          country
      code
      __typename
    }
    geolocalization {
          country {
            code
        country
        __typename
      }
      __typename
    }
    __typename
  }
}
`

export const GET_PUBLIC_DETAILS = gql`
fragment Address on Address {
      id
  firstName
  lastName
  companyName
  streetAddress1
  streetAddress2
  city
  postalCode
  country {
        code
    country
    __typename
  }
  countryArea
  phone
  isDefaultBillingAddress
  isDefaultShippingAddress
  __typename
}

fragment User on User {
      id
  email
  firstName
  lastName
  isStaff
  defaultShippingAddress {
        ...Address
    __typename
  }
  defaultBillingAddress {
        ...Address
    __typename
  }
  addresses {
        ...Address
    __typename
  }
  __typename
}

query UserDetails {
      me {
        ...User
    __typename
  }
}

`
export const GET_MENU_ITEMS = gql`
fragment MainMenuSubItem on MenuItem {
      id
  name
  category {
        id
    name
    __typename
  }
  url
  collection {
        id
    name
    __typename
  }
  page {
        slug
    __typename
  }
  parent {
        id
    __typename
  }
  __typename
}

query MainMenu {
      shop {
        navigation {
          main {
            id
        items {
              ...MainMenuSubItem
          children {
                ...MainMenuSubItem
            children {
                  ...MainMenuSubItem
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`

export const GET_MENU_SUBITEMS = gql`
fragment SecondaryMenuSubItem on MenuItem {
      id
  name
  category {
        id
    name
    __typename
  }
  url
  collection {
        id
    name
    __typename
  }
  page {
        slug
    __typename
  }
  __typename
}

query SecondaryMenu {
      shop {
        navigation {
          secondary {
            items {
              ...SecondaryMenuSubItem
          children {
                ...SecondaryMenuSubItem
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`

export const GET_BANNERS = gql`
query publishedBanners($domain:String!){
  publishedBannerDetails(domain:{
    domain:$domain
  }){
		id
    user{
      id
    }
    image
    published
    __typename
  }
}
`

export const GET_ALL_CATEGORIES = gql`
query getCategory{
  categories(first:100){
    totalCount
    edges{
      node{
        id
        name
        backgroundImage{
          url
        }
        level
        products(first:100){
          totalCount
        }
        }
      }
    }
}`

export const GET_FAQ = gql`
query getFAQs{
  faqs{
    id
    logo
    question
    answer
  }
}
`

export const GET_COLLECTIONS = gql`
query collections($after:String,$afterProduct:String){
  collections(first:100,after:$after){
    pageInfo{
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges{
      node{
        seoTitle
        seoDescription
        id
        name
        description
        descriptionJson
        publicationDate
        slug
        backgroundImage{
          url
          alt
        }
        products(first:100,after:$afterProduct){
          pageInfo{
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges{
             node{
              id
              seoTitle
              seoDescription
              name
              description
              descriptionJson
              publicationDate
              slug              
              category{
                seoTitle
                id
                 seoDescription
                name
                description
                descriptionJson
                slug
              }
            }
            cursor
          }
          totalCount
        }
      }
      cursor
    }
  }
}`

export const GET_PRODUCT_BY_ID = gql`
fragment BasicProductFields on Product {
      id
  name
  thumbnail {
        url
    alt
    __typename
  }
  thumbnail2x: thumbnail(size: 510) {
        url
    __typename
  }
  __typename
}

fragment SelectedAttributeFields on SelectedAttribute {
      attribute {
        id
    name
    __typename
  }
  values {
        id
    name
    __typename
  }
  __typename
}

fragment Price on TaxedMoney {
      gross {
        amount
    currency
    __typename
  }
  net {
        amount
    currency
    __typename
  }
  __typename
}

fragment ProductVariantFields on ProductVariant {
      id
  sku
  name
  isAvailable
  quantityAvailable(countryCode: $countryCode)
  images {
        id
    url
    alt
    __typename
  }
  pricing {
        onSale
    priceUndiscounted {
          ...Price
      __typename
    }
    price {
          ...Price
      __typename
    }
    __typename
  }
  attributes {
        attribute {
          id
      name
      slug
      __typename
    }
    values {
          id
      name
      value: name
      __typename
    }
    __typename
  }
  __typename
}

fragment ProductPricingField on Product {
      pricing {
        onSale
    priceRangeUndiscounted {
          start {
            ...Price
        __typename
      }
      stop {
            ...Price
        __typename
      }
      __typename
    }
    priceRange {
          start {
            ...Price
        __typename
      }
      stop {
            ...Price
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

query ProductDetails($id: ID!, $countryCode: CountryCode) {
      product(id: $id) {
        ...BasicProductFields
    ...ProductPricingField
    descriptionJson
    category {
          id
      name
      products(first: 3) {
            edges {
              node {
                ...BasicProductFields
            ...ProductPricingField
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    images {
          id
      alt
      url
      __typename
    }
    attributes {
          ...SelectedAttributeFields
      __typename
    }
    variants {
          ...ProductVariantFields
      __typename
    }
    seoDescription
    seoTitle
    isAvailable
    isAvailableForPurchase
    availableForPurchase
    __typename
  }
}
`

export const GET_ALL_PRODUCTS = gql`
${BASIC_PRODUCT_FIELDS}
${PRICE}
${PRODUCT_PRICING_FIELD}
query allProductsData($after:String,$search:String, 
  #$attributeSlug:String!,
  #$attributeValue:[String],
  $categories:[ID],
  $collections:[ID],
 # $productType:ID
  ) {
  products(filter:{
    isPublished:true
    hasCategory:true
    search: $search # user search text
  #attributes:{
    #  slug:$attributeSlug # attribute slug 
   #   values:$attributeValue # attribute value
   # }
    categories:$categories # category id
    collections:$collections # collection id
   # productType:$productType # product type id
  	}
    ,first: 100, after:$after) {
    edges {
      node {
        ...BasicProductFields
        ...ProductPricingField
        category {
          id
          name
          __typename
        }
        isPublished
        isAvailableForPurchase
        attributes{
          attribute{
            id
            name
            slug
          }
          values{
            id
            name
            slug
            inputType
          }
        }
        __typename
      }
      __typename
    }
    totalCount
    __typename
  }
}




`
export const GET_ALL_PRODUCTS_FILTERED = gql`
fragment BasicProductFields on Product {
  id
  name
  category{
    id
    name
    __typename
  }
  collections{
    id
    name
    __typename
  }
  productType{
    id
    name
    __typename
  }
  thumbnail {
    url
    alt
    __typename
  }
  thumbnail2x: thumbnail(size: 510) {
    url
    __typename
  }
  __typename
}

fragment Price on TaxedMoney {
  gross {
    amount
    currency
    __typename
  }
  net {
    amount
    currency
    __typename
  }
  __typename
}
fragment ProductPricingField on Product {
  pricing {
    onSale
    priceRangeUndiscounted {
      start {
        ...Price
        __typename
      }
      stop {
        ...Price
        __typename
      }
      __typename
    }
    priceRange {
      start {
        ...Price
        __typename
      }
      stop {
        ...Price
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
query allProductsData(
  #$search: String!
  #$isPublished: Boolean!
  $filter:ProductFilterInput
  #$attribute_slug: String!
  #$attribute_value: [String]
  #$categories: [ID]!
 # $collections: [ID]!
 # $productType: ID!
) {
  products(
    filter: $filter 
    #{
       #search:$search # user search text
      # attributes:[{
    #     slug: $attribute_slug# attribute slug
     #    values:$attribute_value # attribute value
      # }]
      # categories: $categories # category id
      # collections:$collections # collection id
       #productType:$productType # product type id
    #}
    first: 100
  ) {
    edges {
      node {
        ...BasicProductFields
        ...ProductPricingField
        category {
          id
          name
          __typename
        }
        isPublished
        isAvailableForPurchase
        attributes {
          attribute {
            id
            name
            slug
          }
          values {
            id
            name
            slug
            inputType
          }
        }
        __typename
      }
      __typename
    }
    totalCount
    __typename
  }
}
`
export const GET_FEATURED_PRODUCTS_LIST = gql`
query FeaturedProducts {
  products(first: 50) {
    totalCount
    edges {
      node {
        ...BasicProductFields
        ...ProductPricingField
        category {
          id
          name
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
}
}
`

export const GET_FEATURED_PRODUCTS = gql`
fragment BasicProductFields on Product {
      id
  name
  thumbnail {
        url
    alt
    __typename
  }
  thumbnail2x: thumbnail(size: 510) {
        url
    __typename
  }
  __typename
}

fragment Price on TaxedMoney {
      gross {
        amount
    currency
    __typename
  }
  net {
        amount
    currency
    __typename
  }
  __typename
}

fragment ProductPricingField on Product {
      pricing {
        onSale
    priceRangeUndiscounted {
          start {
            ...Price
        __typename
      }
      stop {
            ...Price
        __typename
      }
      __typename
    }
    priceRange {
          start {
            ...Price
        __typename
      }
      stop {
            ...Price
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

query FeaturedProducts {
      shop {
        homepageCollection {
          id
      products(first: 20) {
            edges {
              node {
                ...BasicProductFields
            ...ProductPricingField
            category {
                  id
              name
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`
export const GET_PRODUCT_LIST = gql`
query ProductsList {
      shop {
        description
    name
    homepageCollection {
          id
      backgroundImage {
            url
        __typename
      }
      name
      __typename
    }
    __typename
  }
  categories(level: 0, first: 4) {
        edges {
          node {
            id
        name
        backgroundImage {
              url
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`
export const GET_ALL_ORDERS = gql`
# Write your query or mutation here
fragment User on User {
      id
  phoneNumber
  firstName
  lastName
  userPermissions {
        code
    name
    __typename
  }
  avatar {
        url
    __typename
  }
  orders(first:100){
    pageInfo{
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges{
      node{
        id
        created
        status
        lines{
          id
          productName
          variantName
          quantity
          quantityFulfilled
        }
        billingAddress{
          id
          firstName
          lastName
          streetAddress1
          companyName
          streetAddress2
          city
          cityArea
          postalCode
          country{
            code
            country
          }
          countryArea
          phone
          latitude
          longitude
          isDefaultShippingAddress
          isDefaultBillingAddress
          __typename
        }
      }
      cursor
    }
  }
  __typename
}
query userDetails{
  me{
        ...User
    __typename
  }
}

`

export const GET_USER_CHECKOUT_DETAILS = gql`
fragment Price on TaxedMoney {
      gross {
        amount
    currency
    __typename
  }
  net {
        amount
    currency
    __typename
  }
  __typename
}

fragment ProductVariant on ProductVariant {
      id
  name
  sku
  quantityAvailable
  isAvailable
  pricing {
        onSale
    priceUndiscounted {
          ...Price
      __typename
    }
    price {
          ...Price
      __typename
    }
    __typename
  }
  attributes {
        attribute {
          id
      name
      __typename
    }
    values {
          id
      name
      value: name
      __typename
    }
    __typename
  }
  product {
        id
    name
    thumbnail {
          url
      alt
      __typename
    }
    thumbnail2x: thumbnail(size: 510) {
          url
      __typename
    }
    productType {
          id
      isShippingRequired
      __typename
    }
    __typename
  }
  __typename
}

fragment CheckoutLine on CheckoutLine {
      id
  quantity
  totalPrice {
        ...Price
    __typename
  }
  variant {
        ...ProductVariant
    __typename
  }
  __typename
}

fragment Address on Address {
      id
  firstName
  lastName
  companyName
  streetAddress1
  streetAddress2
  city
  postalCode
  country {
        code
    country
    __typename
  }
  countryArea
  phone
  isDefaultBillingAddress
  isDefaultShippingAddress
  __typename
}

fragment ShippingMethod on ShippingMethod {
      id
  name
  price {
        currency
    amount
    __typename
  }
  __typename
}

fragment PaymentGateway on PaymentGateway {
      id
  name
  config {
        field
    value
    __typename
  }
  currencies
  __typename
}

fragment Checkout on Checkout {
      token
  id
  totalPrice {
        ...Price
    __typename
  }
  subtotalPrice {
        ...Price
    __typename
  }
  billingAddress {
        ...Address
    __typename
  }
  shippingAddress {
        ...Address
    __typename
  }

  availableShippingMethods {
        ...ShippingMethod
    __typename
  }
  shippingMethod {
        ...ShippingMethod
    __typename
  }
  shippingPrice {
        ...Price
    __typename
  }
  lines {
        ...CheckoutLine
    __typename
  }
  isShippingRequired
  discount {
        currency
    amount
    __typename
  }
  discountName
  translatedDiscountName
  voucherCode
  availablePaymentGateways {
        ...PaymentGateway
    __typename
  }
  __typename
}

query UserCheckoutDetails {
      me {
        id
    checkout {
          ...Checkout
      __typename
    }
    __typename
  }
}
`;


export const CHECKOUT_PRODUCT_VARIANTS = gql`
fragment Price on TaxedMoney {
      gross {
        amount
    currency
    __typename
  }
  net {
        amount
    currency
    __typename
  }
  __typename
}

fragment ProductVariant on ProductVariant {
      id
  name
  sku
  quantityAvailable
  isAvailable
  pricing {
        onSale
    priceUndiscounted {
          ...Price
      __typename
    }
    price {
          ...Price
      __typename
    }
    __typename
  }
  attributes {
        attribute {
          id
      name
      __typename
    }
    values {
          id
      name
      value: name
      __typename
    }
    __typename
  }
  product {
        id
    name
    thumbnail {
          url
      alt
      __typename
    }
    thumbnail2x: thumbnail(size: 510) {
          url
      __typename
    }
    productType {
          id
      isShippingRequired
      __typename
    }
    __typename
  }
  __typename
}

query CheckoutProductVariants($ids: [ID]) {
      productVariants(ids: $ids, first: 100) {
        edges {
          node {
            ...ProductVariant
        __typename
      }
      __typename
    }
    __typename
  }
}
`