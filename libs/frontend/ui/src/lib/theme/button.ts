const buttonDefaultVariant = () => {
    return {
        rounded: 'full',
        color: 'gray.50',
        textColor: 'gray.50',
        shadow: 'base',
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
