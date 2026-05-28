export const gb = {
  name: "United Kingdom",
  region_code: "gb",
  currency: "£",
  currency_code: "GBP",
  pricing: {
    payg: {
      offline_percentage: 1,
      online_percentage: 2.65,
      base_price: 25,
    },
    startup: {
      offline_percentage: 0.65,
      online_percentage: 2.3,
      base_price: 60,
    },
    enterprise: {
      offline_percentage: 0.5,
      online_percentage: 2.1,
      base_price: 200,
    },
    enterprise_limit: 1000000,
    support: {
      free: 0,
      chat: 10,
      phone: 100,
    },
    extra_branch_fee: 40,
    custom_domain_fee: 75,
    video_call_minutes_allowance: 20000,
    video_call_minutes_fee: 0.008,
    video_recording_minutes_fee: 0.024,
    video_storage_minutes_fee: 0.0064,
    payouts_fee_percentage: "0.15%",
    intl_cards_fee: "1.5%",
    prem_cards_fee: "2%",
  },
  london: {
    mon_fri: "9am - 5:30pm",
    phone: "020 3966 1863",
    phone_formatted: "020 3966 1863",
  },
  chicago: {
    mon_fri: "8am - 4:30pm (EST)",
    phone: "+1 312-820-9224",
    phone_formatted: "+1 312-820-9224",
  },
};
