// models/adModel.js (simplified version)
let ads = [];

const createAd = (adId, advertiser) => {
  const ad = { adId, advertiser, impressions: 0 };
  ads.push(ad);
  return ad;
};

const trackImpression = (adId) => {
  const ad = ads.find(a => a.adId === adId);
  if (ad) {
    ad.impressions += 1;
  }
  return ad;
};

const getAd = (adId) => {
  return ads.find(a => a.adId === adId);
};

module.exports = { createAd, trackImpression, getAd };
