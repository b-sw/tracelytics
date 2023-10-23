const buttonDefaultVariant = () => {
    return {
        rounded: 'full',
        color: 'gray.500',
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
