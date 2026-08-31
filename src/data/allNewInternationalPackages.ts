import { Destination, HolidayPackage } from '../types';
import { NEW_31_INTERNATIONAL_DESTINATIONS, NEW_31_INTERNATIONAL_PACKAGES as PART_1 } from './newInternationalPackages';
import { PACKAGES_PART_2 } from './newInternationalPackagesPart2';
import { PACKAGES_PART_3 } from './newInternationalPackagesPart3';

export const ALL_NEW_31_INTERNATIONAL_DESTINATIONS: Destination[] = NEW_31_INTERNATIONAL_DESTINATIONS;

export const ALL_NEW_31_INTERNATIONAL_PACKAGES: HolidayPackage[] = [
  ...PART_1,
  ...PACKAGES_PART_2,
  ...PACKAGES_PART_3
];
