import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

type Props = {
    handleChange: (value: string) => void;
    placeholder?: string;
};

export const SearchInput = ({ handleChange, placeholder }: Props) => {
    const PLACEHOLDER = placeholder ?? 'Search here';

    return (
        <InputGroup size={'lg'} pb={5}>
            <InputLeftElement pointerEvents={'none'} children={<MdSearch />} fontSize={25} color={'tcs.500'} />
            <Input
                placeholder={PLACEHOLDER}
                onChange={event => handleChange(event.target.value)}
                rounded={'full'}
                shadow={'md'}
            />
        </InputGroup>
    );
};
