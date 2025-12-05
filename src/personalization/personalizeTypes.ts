export type TravelType = 'luxury' | 'Economy' | 'Budget';

export type PersonalizeContext = {
 
  travelType?: TravelType;
};

// Result coming back from Personalize
export type PersonalizeVariantResult = {
  /**
   * Variant alias returned by Personalize Edge, e.g. "cs_personalize_0_0".
   * This is what we will pass to CDA via `x-cs-variant-uid`.
   */
  variantAlias?: string;
};

// Resolver signature that the UI passes into the personalized hook
export type PersonalizeVariantResolver = (args: {
  experienceId: string;
  travelType?: TravelType;
}) => Promise<PersonalizeVariantResult>;
