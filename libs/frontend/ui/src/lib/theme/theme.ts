import { extendTheme } from '@chakra-ui/react';
import { Checkbox } from './checkbox';
import { colors } from './colors';
import { Input } from './input';
import { Text } from './text';
import { Tooltip } from './tooltip';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const components = {
    Input,
    Checkbox,
    Tooltip,
    Text,
};

export const theme = extendTheme({ colors, config, components });
