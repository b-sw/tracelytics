const tooltipDefaultVariant = () => {
    return {
        rounded: 'full',
        letterSpacing: '.5px',
        px: 3,
        backgroundColor: 'gray.400',
        shadow: 'md',
    };
};

export const Tooltip = {
    variants: {
        defaultTooltip: tooltipDefaultVariant,
    },
    defaultProps: {
        variant: 'defaultTooltip',
    },
};
