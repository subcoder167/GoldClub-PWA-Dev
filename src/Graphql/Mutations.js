import { gql } from "@apollo/client";

export const SEND_OTP = gql`
mutation sendOTP($mobile:String!) {
  otp(mobile:$mobile) {
    status
    message
  }
}
`

export const VALIDATE_OTP = gql`
mutation verifyOTP ($mobile:String!, $otp:String!) {
  verify(mobile: $mobile, otp: $otp) {
    status
    message
    token
    refreshToken
    csrfToken
    isRetailer
    domain
      user {
      id
      lastLogin
      phoneNumber
      email
      firstName
      lastName
      isActive
      dateJoined
      birthDate,
      anniversaryDate,
      defaultShippingAddress {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        countryArea
        country
        {
        code
        country
        }
        phone
        isDefaultShippingAddress
        isDefaultBillingAddress
      }
      defaultBillingAddress {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        countryArea
         country
        {
        code
        country
        }
        phone
        isDefaultShippingAddress
        isDefaultBillingAddress
      }
      addresses {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        countryArea
        phone
        isDefaultShippingAddress
        isDefaultBillingAddress
      }
      checkout {
        created
        lastChange
        quantity
        billingAddress {
          id
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          countryArea
          phone
          isDefaultShippingAddress
          isDefaultBillingAddress
        }
        shippingAddress {
          id
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          countryArea
          phone
          isDefaultShippingAddress
          isDefaultBillingAddress
        }
        discount {
          currency
          amount
        }
        discountName
        voucherCode
        giftCards {
          code
          created
          startDate
          endDate
          lastUsedOn
          isActive
          initialBalance {
            currency
            amount
          }
          currentBalance {
            currency
            amount
          }
          id
          displayCode
        }
        id
        availableShippingMethods {
          id
          name
          price {
            currency
            amount
          }
          minimumOrderPrice {
            currency
            amount
          }
          maximumOrderPrice {
            currency
            amount
          }
          minimumOrderWeight {
            unit
            value
          }
          maximumOrderWeight {
            unit
            value
          }
          type
        }
        phoneNumber
        isShippingRequired
        shippingPrice {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
        }
        subtotalPrice {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            currency
            amount
          }
        }
        token
        totalPrice {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            currency
            amount
          }
        }
      }
      orders(first: 50) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            created
            status
            languageCode
            trackingClientId
            billingAddress {
              id
              firstName
              lastName
              companyName
              streetAddress1
              streetAddress2
              city
              cityArea
              postalCode
              countryArea
              phone
              isDefaultShippingAddress
              isDefaultBillingAddress
            }
            shippingAddress {
              id
              firstName
              lastName
              companyName
              streetAddress1
              streetAddress2
              city
              cityArea
              postalCode
              countryArea
              phone
              isDefaultShippingAddress
              isDefaultBillingAddress
            }
            shippingMethod {
              id
              name
              price {
                currency
                amount
              }
              minimumOrderPrice {
                currency
                amount
              }
              maximumOrderPrice {
                currency
                amount
              }
              minimumOrderWeight {
                unit
                value
              }
              maximumOrderWeight {
                unit
                value
              }
              type
            }
            shippingMethodName
            shippingPrice{
              currency
              gross{
                amount
              }
              net{
                amount
              }
              tax{
                amount
              }
            }
            token
            voucher{
              id
              name
              type
              code
              usageLimit
              used
              startDate
              endDate
              applyOncePerOrder
              applyOncePerCustomer
              discountValueType
              discountValue
              minSpent{
                currency
                amount
              }
              minCheckoutItemsQuantity
              categories(first:10){
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
                    slug
                    level
                    privateMetadata{
                      key
                      value
                    }
                    ancestors(first:10){
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
                          slug
                          level
                        }
                        cursor
                      }
                    }
                    products(first:50){
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
                          productType{
                            id
                            name
                            slug
                            hasVariants
                            isShippingRequired
                            isDigital
                            weight{
                              unit
                              value
                            }
                            taxRate
                            taxType{
                              description
                              taxCode
                            }
                            variantAttributes{
                              id
                              productTypes(first:100){
                                pageInfo{
                                  hasNextPage
                                  hasPreviousPage
                                  startCursor
                                  endCursor
                                }
                                edges{
                                  node{
                                    id
                                    name
                                    slug
                                    hasVariants
                                    isShippingRequired
                                    isDigital
                                    weight{
                                      unit
                                      value
                                    }
                                    taxRate
                                  }
                                  cursor
                                }
                                totalCount
                              }
                              productVariantTypes(first:20){
                                pageInfo{
                                  hasNextPage
                                  hasPreviousPage
                                  startCursor
                                  endCursor
                                }
                                edges{
                                  node{
                                    id
                                    name
                                    slug
                                    hasVariants
                                    isShippingRequired
                                    isDigital
                                  }
                                  cursor
                                }
                                totalCount
                              }
                              inputType
                              name
                              slug
                              values{
                                id
                                name
                                slug
                              }
                              valueRequired
                              visibleInStorefront
                              filterableInStorefront
                              filterableInDashboard
                              availableInGrid
                              storefrontSearchPosition
                            }
                            productAttributes{
                              id
                              inputType
                              name
                              slug
                              values{
                                id
                                name
                                slug
                              }
                              valueRequired
                              visibleInStorefront
                              filterableInStorefront
                              filterableInDashboard
                              availableInGrid
                              storefrontSearchPosition
                            }
                          }
                          slug
                          # category
                          updatedAt
                          chargeTaxes
                          # weight
                          availableForPurchase
                          visibleInListings
                          # defaultVariant
                          # thumbnail
                          # pricing
                          isAvailable
                          # minimalVariantPrice
                          # taxType
                          # attributes
                          # purchaseCost
                          # margin
                          # imageById
                          # variants
                          # images
                          # collections
                          isAvailableForPurchase
                          isPublished
                        }
                        cursor
                      }
                    }
                    backgroundImage{
                      url
                      alt
                    }
                  }
                  cursor
                }
                
              }
              # collections
              # products
              # countries
            }
            # giftCards
            # discount
            discountName
            displayGrossPrices
            customerNote
            # weight
            # fulfillments
            # lines
            actions
            invoices{
              id
              status
              externalUrl             
              createdAt
              updatedAt
              message
              url
            }
            number
            isPaid
            paymentStatus
            paymentStatusDisplay
            payments{
              id
              gateway
              isActive
              created
              modified
              token
            }
            total{
              currency
              gross{
                currency
                amount
              }
              net{
                currency
                amount
              }
              tax{
                currency
                amount
              }
            }
            subtotal{
              currency
              gross{
                currency
                amount
              }
              net{
                currency
                amount
              }
              tax{
                currency
                amount
              }
            }
            statusDisplay
            canFinalize
            totalAuthorized{
              currency
              amount
            }
            totalCaptured{
              currency
              amount
            }
            events{
              id
              date
              type
              message
              phoneNumber
              phoneNumberType
              amount
              paymentId
              paymentGateway
            }
            totalBalance{
              currency
              amount
            }
            phoneNumber
            isShippingRequired
          }
          cursor
        }
        totalCount
      }
    }
  }
}`


export const CREATE_TOKEN = gql`
mutation createToken{
  tokenCreate(password:"password",phoneNumber:"+919510321680"){
      token
   
  }
}`

export const REGISTER = gql`
mutation createCustomer($firstName: String!
  $lastName: String!
  $phoneNumber: String!
) {
  customerCreate(
    input: {
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      isActive: true
    }
  ) {
    accountErrors {
      field
      message
      code
    }
    user {
      id
      phoneNumber
      firstName
      lastName
      isStaff
      isActive
      isRetailer
      dateJoined
    }
  }
}`


export const UPDATE_PROFILE = gql`
mutation updateCustomer(
  $id: ID!
  $firstName: String!
  $lastName: String!
  $phoneNumber: String!
  $isActive: Boolean!
  $email: String!
  $brandName: String!
  $streetAddress1: String!
  $streetAddress2: String!
  $birthDate: DateTime!
  $anniversaryDate: DateTime!
  $city: String!
  $cityArea: String!
  $postalCode: String!
  $country: CountryCode!
  $countryArea: String!
) {
  customerUpdate(
    id: $id
    input: {
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      isActive: $isActive
      email: $email
      birthDate: $birthDate
      anniversaryDate: $anniversaryDate
      defaultBillingAddress: {
        firstName: $firstName
        lastName: $lastName
        companyName: $brandName
        streetAddress1: $streetAddress1
        streetAddress2: $streetAddress2
        city: $city
        cityArea: $cityArea
        postalCode: $postalCode
        country: $country
        countryArea: $countryArea
        phone: $phoneNumber
      }
      defaultShippingAddress: {
        firstName: $firstName
        lastName: $lastName
        companyName: $brandName
        streetAddress1: $streetAddress1
        streetAddress2: $streetAddress2
        city: $city
        cityArea: $cityArea
        postalCode: $postalCode
        country: $country
        countryArea: $countryArea
        phone: $phoneNumber
      }
    }
  ) {
    accountErrors {
      field
      message
      code
    }
    user {
      id
      lastLogin
      phoneNumber
      email
      firstName
      lastName
      isStaff
      isActive
      isRetailer
      note
      dateJoined
      birthDate
      anniversaryDate
      defaultBillingAddress {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          code
          country
          vat {
            countryCode
            standardRate
            reducedRates {
              rate
              rateType
            }
          }
        }
        countryArea
        phone
        isDefaultBillingAddress
        isDefaultShippingAddress
      }
      defaultShippingAddress {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          code
          country
          vat {
            countryCode
            standardRate
            reducedRates {
              rate
              rateType
            }
          }
        }
        countryArea
        phone
        isDefaultShippingAddress
        isDefaultBillingAddress
      }
    }
  }
}
`

export const CREATE_ADDRESS = gql`
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

fragment AccountError on AccountError {
      code
  field
  message
  __typename
}

mutation CreateUserAddress($input: AddressInput!) {
      accountAddressCreate(input: $input) {
        errors: accountErrors {
          ...AccountError
      __typename
    }
    user {
          ...User
      __typename
    }
    __typename
  }
}
`

export const CREATE_CHECKOUT = gql`
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
  phoneNumber
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

fragment CheckoutError on CheckoutError {
      code
  field
  message
  __typename
}

mutation CreateCheckout($checkoutInput: CheckoutCreateInput!) {
      checkoutCreate(input: $checkoutInput) {
        errors: checkoutErrors {
          ...CheckoutError
      __typename
    }
    checkout {
          ...Checkout
           metadata{
    key
    value
  }
      __typename
    }
    __typename
  }
 
}
`
export const UPDATE_CHECKOUT_BILLING_ADDRESS = gql`
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

fragment CheckoutError on CheckoutError {
      code
  field
  message
  __typename
}

mutation UpdateCheckoutBillingAddress($checkoutId: ID!, $billingAddress: AddressInput!) {
      checkoutBillingAddressUpdate(checkoutId: $checkoutId, billingAddress: $billingAddress) {
        errors: checkoutErrors {
          ...CheckoutError
      __typename
    }
    checkout {
          ...Checkout
      __typename
    }
    __typename
  }
}
`

export const CREATE_CHECKOUT_PAYMENT = gql`
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
  phoneNumber
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

fragment Payment on Payment {
      id
  gateway
  token
  creditCard {
        brand
    firstDigits
    lastDigits
    expMonth
    expYear
    __typename
  }
  total {
        amount
    currency
    __typename
  }
  __typename
}

fragment PaymentError on PaymentError {
      code
  field
  message
  __typename
}

mutation CreateCheckoutPayment($checkoutId: ID!, $paymentInput: PaymentInput!) {
      checkoutPaymentCreate(checkoutId: $checkoutId, input: $paymentInput) {
        checkout {
          ...Checkout
      __typename
    }
    payment {
          ...Payment
      __typename
    }
    errors: paymentErrors {
          ...PaymentError
      __typename
    }
    __typename
  }
}

`
export const COMPLETE_CHECKOUT = gql`
fragment OrderPrice on TaxedMoney {
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

fragment OrderDetail on Order {
      phoneNumber
  paymentStatus
  paymentStatusDisplay
  status
  statusDisplay
  id
  token
  number
  shippingAddress {
        ...Address
    __typename
  }
  lines {
        productName
    quantity
    variant {
          ...ProductVariant
      __typename
    }
    unitPrice {
          currency
      ...OrderPrice
      __typename
    }
    totalPrice {
          currency
      ...OrderPrice
      __typename
    }
    __typename
  }
  subtotal {
        ...OrderPrice
    __typename
  }
  total {
        ...OrderPrice
    __typename
  }
  shippingPrice {
        ...OrderPrice
    __typename
  }
  __typename
}

fragment CheckoutError on CheckoutError {
      code
  field
  message
  __typename
}

mutation CompleteCheckout($checkoutId: ID!, $paymentData: JSONString, $redirectUrl: String, $storeSource: Boolean) {
      checkoutComplete(checkoutId: $checkoutId, paymentData: $paymentData, redirectUrl: $redirectUrl, storeSource: $storeSource) {
        errors: checkoutErrors {
          ...CheckoutError
      __typename
    }
    order {
          ...OrderDetail
      __typename
    }
    confirmationNeeded
    confirmationData
    __typename
  }
}

`