export const orders = [
    {
      id: "ORD-2025-1234",
      status: "Processing",
      createdAt: "09 Sep 2025",
      deliveryDate: "15 Sep 2025",
      total: 245000,
      itemsCount: 2,
      items: [
        {
          id: 1,
          name: "Fruit Juice",
          desc: "Refreshing drink 1L",
          price: 5000,
          quantity: 10,
          image: "/src/assets/products/chivita.png",
        },
        {
          id: 2,
          name: "Product 2",
          desc: "Short description here",
          price: 3500,
          quantity: 5,
          image: "/src/assets/products/chivita.png",
        },
      ],
      shippingAddress: {
        firstName: "John",
        lastName: "Doe",
        phone: "+2348012345678",
        address: "No 1, Example Street, Lagos",
      },
    },
    {
      id: "ORD-2025-1235",
      status: "Delivered",
      createdAt: "05 Sep 2025",
      deliveryDate: "08 Sep 2025",
      total: 120000,
      itemsCount: 1,
      items: [
        {
          id: 3,
          name: "Cereal",
          desc: "Family pack 500g",
          price: 120000,
          quantity: 1,
          image: "/src/assets/products/chivita.png",
        },
      ],
      shippingAddress: {
        firstName: "Jane",
        lastName: "Smith",
        phone: "+2348098765432",
        address: "No 2, Example Avenue, Abuja",
      },
    },
    {
      id: "ORD-2025-1236",
      status: "Shipped",
      createdAt: "07 Sep 2025",
      deliveryDate: "12 Sep 2025",
      total: 89000,
      itemsCount: 3,
      items: [
        {
          id: 4,
          name: "Biscuits",
          desc: "Snack pack (12 pieces)",
          price: 89000,
          quantity: 3,
          image: "/src/assets/products/chivita.png",
        },
      ],
      shippingAddress: {
        firstName: "Mark",
        lastName: "Anthony",
        phone: "+2348088888888",
        address: "No 3, Broad Street, Port Harcourt",
      },
    },
  ];
  