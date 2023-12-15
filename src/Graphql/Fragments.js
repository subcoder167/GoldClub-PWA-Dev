import { gql } from "@apollo/client"

export const BASIC_PRODUCT_FIELDS = gql`fragment BasicProductFields on Product {
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
`

export const SELECTED_ATTRIBUTE = gql`fragment SelectedAttributeFields on SelectedAttribute {
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
`
export const PRICE = gql`fragment Price on TaxedMoney {
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
`
export const PRODUCT_VARIANT_FIELDS = gql`
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
`
export const PRODUCT_PRICING_FIELD = gql`
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
`
