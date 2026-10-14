import type { ResponsiveImageSource } from '../../utils/assetLoaders';

export const PROJECT_PREVIEW_IMAGE_SIZES = '(max-width: 767px) 0px, clamp(220px, 22vw, 320px)';
export const PROJECT_DETAILS_IMAGE_SIZES =
    '(max-width: 767px) calc(100vw - 4.5rem), min(calc(42vw - 2rem), 44rem)';

interface ProjectImageSet {
    preview: ResponsiveImageSource;
    details: ResponsiveImageSource;
}

export const projectImagesById: Record<string, ProjectImageSet> = {};
