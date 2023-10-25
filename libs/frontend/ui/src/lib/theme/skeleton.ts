const skeletonDefaultVariant = () => {
    return {
        borderRadius: 15,
    };
};

export const Skeleton = {
    variants: {
        defaultSkeleton: skeletonDefaultVariant,
    },
    defaultProps: {
        variant: 'defaultSkeleton',
    },
};
