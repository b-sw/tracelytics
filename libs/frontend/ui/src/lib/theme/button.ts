const buttonDefaultVariant = () => {
    return {
        rounded: 'full',
    };
};

export const Button = {
    variants: {
        defaultButton: buttonDefaultVariant,
    },
    defaultProps: {
        variant: 'defaultButton',
    },
};
