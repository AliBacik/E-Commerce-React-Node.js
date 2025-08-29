import { Fragment } from "react";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";


const ShopPage = () => {
  return (
    <>
      <div>ShopPage</div>
      <Fragment>
        <Categories />
        <Products />
        <CampaignSingle />
        <Products />
      </Fragment>
    </>
  );
};

export default ShopPage;
