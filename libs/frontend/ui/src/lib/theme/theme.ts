import { extendTheme } from '@chakra-ui/react';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { colors } from './colors';
import { Input } from './input';
import { Modal } from './modal';
import { Skeleton } from './skeleton';
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
    Modal,
    Button,
    Skeleton,
};

export const theme = extendTheme({ colors, config, components });
