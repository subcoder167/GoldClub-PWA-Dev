import React, { useState } from "react";

import { useEffect } from "react";
import Empty from "../components/FallBacks/Empty";

const Favourites = () => {
  //   const [orders, setOrders] = useState(
  //     JSON.parse(localStorage.getItem("vjw-user"))?.user?.orders?.edges
  //   );

  return (
    <section>
      <Empty variant="Favourites" />
    </section>
  );
};

export default Favourites;
