const textDefaultVariant = () => {
    return {
        color: 'gray.900',
    };
};

export const Text = {
    variants: {
        defaultText: textDefaultVariant,
    },
    defaultProps: {
        variant: 'defaultText',
    },
};
