// src/personalization/resolveVariant.ts

import Personalize from '@contentstack/personalize-edge-sdk';
import type { PersonalizeVariantResolver } from './personalizeTypes';

// 🔐 From your "Travel Personalization" project
const PERSONALIZE_PROJECT_UID = '692f4df871b6084e28958c5f';

// From Personalize → Attributes → "Travel Type" → Attribute key
const ATTRIBUTE_KEY_FOR_TRAVEL_TYPE = 'travel_type';

// These are the values you used in the audience rules
type TravelType = 'luxury' | 'Economy' | 'Budget';

// TODO: wire this from UI (dropdown, query param, etc.)
const CURRENT_TRAVEL_TYPE: TravelType = 'Budget';

export const resolveVariant: PersonalizeVariantResolver = async ({
  experienceId,
}) => {
  console.log('Resolving variant for experience:', experienceId);
  console.log('Sending Travel Type to Personalize:', CURRENT_TRAVEL_TYPE);

  try {
    const sdk = await Personalize.init(PERSONALIZE_PROJECT_UID, {
      liveAttributes: {
        [ATTRIBUTE_KEY_FOR_TRAVEL_TYPE]: CURRENT_TRAVEL_TYPE,
      },
    });

    // This does internally what /manifest does and returns the aliases,
    // e.g. ["cs_personalize_0_0", ...]
    const variantAliases = sdk.getVariantAliases
      ? sdk.getVariantAliases()
      : [];

    console.log('Variant aliases from Personalize:', variantAliases);

    const variantAlias =
      Array.isArray(variantAliases) && variantAliases.length > 0
        ? variantAliases[0]
        : undefined;

    if (!variantAlias) {
      console.warn(
        'Personalize returned no active variant. Falling back to base hero entry.'
      );
      return {};
    }

    return { variantAlias };
  } catch (e: any) {
    console.error('Error in resolveVariant / Personalize:', e);
    return {};
  }
};
