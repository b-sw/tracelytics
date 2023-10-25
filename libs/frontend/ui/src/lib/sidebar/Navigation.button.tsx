import { Button, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { Path } from '@tracelytics/frontend/domain';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    path: string;
    icon: IconType;
    description: string;
    badge?: ReactNode;
};

export const NavigationButton = ({ path, icon, description, badge }: Props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isActiveRoute = (routeName: string): boolean => {
        return pathname.includes(routeName);
    };

    const textColor = isActiveRoute(path) ? 'gray.700' : 'gray.500';
    const iconColor = isActiveRoute(path) ? 'purple.500' : 'gray.400';
    const borderBottom = isActiveRoute(path) ? '3px solid #7928CA' : 'none';

    return (
        <Flex alignItems={'center'}>
            <Button
                onClick={() => navigate(`${Path.DASHBOARD}${path}`)}
                variant={'link'}
                outline="none"
                _focus={{ boxShadow: 'none' }}
                _active={{ boxShadow: 'none' }}
                _hover={{ textDecoration: 'none' }}
                size={'lg'}
            >
                <Flex position={'absolute'} borderBottom={borderBottom} h={'64px'} width={'full'} />
                <Flex alignItems={'center'} gap={2}>
                    <Icon as={icon} color={iconColor} />
                    <Text color={textColor} fontSize={'xl'}>
                        {description}
                    </Text>
                    <Spacer />
                </Flex>
            </Button>

            {badge}
        </Flex>
    );
};
