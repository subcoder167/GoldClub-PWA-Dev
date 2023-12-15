export const filter = [
  {
    "query": "Metal",
    "slug": 'metal-type',
    "options": [
      {
        "optionType": "gold",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "silver",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "platinum",
        "available": 12345,
        "active": false
      }
    ]
  },
  {
    "query": "Gender",
    "slug": 'gender',
    "options": [
      {
        "optionType": "male",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "female",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "kids",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "unisex",
        "available": 12345,
        "active": false
      }
    ]
  },
  {
    "query": "Gemstones",
    "slug": "gemstone-type",
    "options": [
      {
        "optionType": "diamond",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "emerald",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "ruby",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "sapphire",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "pearl",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "amethyst",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "agate",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "alexandrite",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "american_diamond",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "apatite",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "aquamarine",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "aventurine",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "beads",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "black_beads",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "black_onyx",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "blue_topaz",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "carnelian",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "chrysoberyl",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "citrine",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "coral",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "garnet",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "golden_topaz",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "hematite",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "imitation_stone",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "iolite",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "jade",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "lapis_lazuli",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "mala",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "malachite",
        "available": 12345,
        "active": false
      },
      {
        "optionType": "moonstone",
        "available": 12345,
        "active": false
      }
    ]
  }
]


export const products = [
  {
    "__typename": "ProductCountableEdge",
    "node": {
      "__typename": "Product",
      "category": {
        "__typename": "Category",
        "id": "Q2F0ZWdvcnk6MQ==",
        "name": "Rings"
      },
      "isPublished": true,
      "isAvailableForPurchase": true,
      "attributes": [
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjE=",
            "name": "Gold Carat",
            "slug": "gold-carat"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6Mg==",
              "name": "22",
              "slug": "22",
              "inputType": "DROPDOWN"
            }
          ]
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjM=",
            "name": "Platinum Carat",
            "slug": "platinum-carat"
          },
          "values": []
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjI=",
            "name": "Silver Carat",
            "slug": "silver-carat"
          },
          "values": []
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjg=",
            "name": "Gender",
            "slug": "gender"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6NTQ=",
              "name": "Male",
              "slug": "male",
              "inputType": "DROPDOWN"
            }
          ]
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjk=",
            "name": "Availability",
            "slug": "availability"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6NTg=",
              "name": "Ready",
              "slug": "ready",
              "inputType": "DROPDOWN"
            }
          ]
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjEy",
            "name": "Type",
            "slug": "type"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6ODI=",
              "name": "Studded",
              "slug": "studded",
              "inputType": "DROPDOWN"
            }
          ]
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjEw",
            "name": "Community/Region",
            "slug": "communityregion"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6NjA=",
              "name": "Bihari",
              "slug": "bihari",
              "inputType": "DROPDOWN"
            }
          ]
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjEx",
            "name": "Ocassian",
            "slug": "ocassian"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6Nzc=",
              "name": "Everyday",
              "slug": "everyday",
              "inputType": "DROPDOWN"
            }
          ]
        }
      ],
      "id": "UHJvZHVjdDoy",
      "name": "Mens Ring",
      "collections": [
        {
          "__typename": "Collection",
          "id": "Q29sbGVjdGlvbjox",
          "name": "Featured Products"
        }
      ],
      "productType": {
        "__typename": "ProductType",
        "id": "UHJvZHVjdFR5cGU6MQ==",
        "name": "Rings"
      },
      "thumbnail": {
        "__typename": "Image",
        "url": "http://165.232.190.124/media/__sized__/products/mens_ring-thumbnail-255x255-70.jpg",
        "alt": ""
      },
      "thumbnail2x": {
        "__typename": "Image",
        "url": "http://165.232.190.124/media/__sized__/products/mens_ring-thumbnail-510x510-70.jpg"
      },
      "pricing": {
        "__typename": "ProductPricingInfo",
        "onSale": false,
        "priceRangeUndiscounted": {
          "__typename": "TaxedMoneyRange",
          "start": {
            "__typename": "TaxedMoney",
            "gross": {
              "__typename": "Money",
              "amount": 25890,
              "currency": "INR"
            },
            "net": {
              "__typename": "Money",
              "amount": 25890,
              "currency": "INR"
            }
          },
          "stop": {
            "__typename": "TaxedMoney",
            "gross": {
              "__typename": "Money",
              "amount": 47850,
              "currency": "INR"
            },
            "net": {
              "__typename": "Money",
              "amount": 47850,
              "currency": "INR"
            }
          }
        },
        "priceRange": {
          "__typename": "TaxedMoneyRange",
          "start": {
            "__typename": "TaxedMoney",
            "gross": {
              "__typename": "Money",
              "amount": 25890,
              "currency": "INR"
            },
            "net": {
              "__typename": "Money",
              "amount": 25890,
              "currency": "INR"
            }
          },
          "stop": {
            "__typename": "TaxedMoney",
            "gross": {
              "__typename": "Money",
              "amount": 47850,
              "currency": "INR"
            },
            "net": {
              "__typename": "Money",
              "amount": 47850,
              "currency": "INR"
            }
          }
        }
      }
    }
  },
  {
    "__typename": "ProductCountableEdge",
    "node": {
      "__typename": "Product",
      "category": {
        "__typename": "Category",
        "id": "Q2F0ZWdvcnk6MQ==",
        "name": "Rings"
      },
      "isPublished": true,
      "isAvailableForPurchase": true,
      "attributes": [
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjE=",
            "name": "Gold Carat",
            "slug": "gold-carat"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6Mg==",
              "name": "22",
              "slug": "22",
              "inputType": "DROPDOWN"
            }
          ]
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjM=",
            "name": "Platinum Carat",
            "slug": "platinum-carat"
          },
          "values": []
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjI=",
            "name": "Silver Carat",
            "slug": "silver-carat"
          },
          "values": []
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjg=",
            "name": "Gender",
            "slug": "gender"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6NTQ=",
              "name": "Male",
              "slug": "male",
              "inputType": "DROPDOWN"
            }
          ]
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjk=",
            "name": "Availability",
            "slug": "availability"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6NTg=",
              "name": "Ready",
              "slug": "ready",
              "inputType": "DROPDOWN"
            }
          ]
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjEy",
            "name": "Type",
            "slug": "type"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6ODI=",
              "name": "Studded",
              "slug": "studded",
              "inputType": "DROPDOWN"
            }
          ]
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjEw",
            "name": "Community/Region",
            "slug": "communityregion"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6NjA=",
              "name": "Bihari",
              "slug": "bihari",
              "inputType": "DROPDOWN"
            }
          ]
        },
        {
          "__typename": "SelectedAttribute",
          "attribute": {
            "__typename": "Attribute",
            "id": "QXR0cmlidXRlOjEx",
            "name": "Ocassian",
            "slug": "ocassian"
          },
          "values": [
            {
              "__typename": "AttributeValue",
              "id": "QXR0cmlidXRlVmFsdWU6Nzc=",
              "name": "Everyday",
              "slug": "everyday",
              "inputType": "DROPDOWN"
            }
          ]
        }
      ],
      "id": "UHJvZHVjdDoy",
      "name": "Mens Ring",
      "collections": [
        {
          "__typename": "Collection",
          "id": "Q29sbGVjdGlvbjox",
          "name": "Featured Products"
        }
      ],
      "productType": {
        "__typename": "ProductType",
        "id": "UHJvZHVjdFR5cGU6MQ==",
        "name": "Rings"
      },
      "thumbnail": {
        "__typename": "Image",
        "url": "http://165.232.190.124/media/__sized__/products/mens_ring-thumbnail-255x255-70.jpg",
        "alt": ""
      },
      "thumbnail2x": {
        "__typename": "Image",
        "url": "http://165.232.190.124/media/__sized__/products/mens_ring-thumbnail-510x510-70.jpg"
      },
      "pricing": {
        "__typename": "ProductPricingInfo",
        "onSale": false,
        "priceRangeUndiscounted": {
          "__typename": "TaxedMoneyRange",
          "start": {
            "__typename": "TaxedMoney",
            "gross": {
              "__typename": "Money",
              "amount": 25890,
              "currency": "INR"
            },
            "net": {
              "__typename": "Money",
              "amount": 25890,
              "currency": "INR"
            }
          },
          "stop": {
            "__typename": "TaxedMoney",
            "gross": {
              "__typename": "Money",
              "amount": 47850,
              "currency": "INR"
            },
            "net": {
              "__typename": "Money",
              "amount": 47850,
              "currency": "INR"
            }
          }
        },
        "priceRange": {
          "__typename": "TaxedMoneyRange",
          "start": {
            "__typename": "TaxedMoney",
            "gross": {
              "__typename": "Money",
              "amount": 25890,
              "currency": "INR"
            },
            "net": {
              "__typename": "Money",
              "amount": 25890,
              "currency": "INR"
            }
          },
          "stop": {
            "__typename": "TaxedMoney",
            "gross": {
              "__typename": "Money",
              "amount": 47850,
              "currency": "INR"
            },
            "net": {
              "__typename": "Money",
              "amount": 47850,
              "currency": "INR"
            }
          }
        }
      }
    }
  }
]



export const materials = [
  {
    id: 1,
    name: "14KT White Gold",
    available: "In Stock"
  }, {
    id: 2,
    name: "14KT Yellow Gold",
    available: "In Stock"
  }, {
    id: 3,
    name: "18KT White Gold",
    available: "In Stock"
  }, {
    id: 4,
    name: "18KT Yellow Gold",
    available: "In Stock"
  }
]
export const sizes = [
  {
    id: 1,
    name: "5",
    size: "8mm",
    available: "In Stock"
  }, {
    id: 2,
    name: "6",
    size: "4mm",
    available: "In Stock"
  }, {
    id: 3,
    name: "4",
    size: "6mm",
    available: "In Stock"
  }, {
    id: 4,
    name: "5",
    size: "8mm",
    available: "In Stock"
  },
]


let rates = localStorage.getItem(`vjw-${window.location.hostname}rates`)
export const metalRates = () => {
  if (rates) return JSON.parse(rates)

  return {
  }

}
