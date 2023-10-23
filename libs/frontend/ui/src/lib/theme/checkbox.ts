import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const circular = definePartsStyle({
    icon: {
        color: 'tcs.50',
    },
    control: defineStyle({
        rounded: 'full',
        padding: 2,
        borderColor: 'tcs.100',
        _checked: {
            bg: 'tcs.500',
            borderColor: 'tcs.500',
            _hover: {
                bg: 'tcs.500',
                borderColor: 'tcs.500',
            },
        },
        _hover: {
            bg: 'tcs.100',
        },
    }),
});

export const Checkbox = defineMultiStyleConfig({
    variants: { circular },
});
