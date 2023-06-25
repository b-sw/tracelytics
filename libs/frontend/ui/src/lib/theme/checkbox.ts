import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const circular = definePartsStyle({
    control: defineStyle({
        rounded: 'full',
        padding: 2,
        _checked: {
            bg: 'tcs.500',
            borderColor: 'tcs.500',
            _hover: {
                bg: 'tcs.500',
                borderColor: 'tcs.500',
            },
        },
    }),
});

export const Checkbox = defineMultiStyleConfig({
    variants: { circular },
});
