import { sampleAdsArray } from "@app/constants";
import EditAdModal from "./EditAdModal";
import AdCard from "./AdCard";
import { useContext } from "react";
import { AdsPageContext } from "./AdsPageContext";
import { Ad } from "@types";

function MyAdsSection() {
  const { ads, adModalDetails, handleOpenAd, handleRemoveAd } =
    useContext(AdsPageContext);
  return (
    <section>
      {adModalDetails.open && <EditAdModal />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
        {ads.map((item: Ad) => (
          <AdCard
            key={item.id}
            {...item}
            handleOpenAd={handleOpenAd}
            handleRemoveAd={handleRemoveAd}
          />
        ))}
      </div>
    </section>
  );
}

export default MyAdsSection;
