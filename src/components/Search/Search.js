import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Flex } from '../Box';
import { MotionFlex } from '../Animation';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Form';

const SearchOverlayTop = ({ closeIcon, topContent, onClose }) => <Flex className="vf-search-overlay__top-wrapper"
    __css={{
        padding: "16px",
        justifyContent: 'space-between',
        width: "100%",
        alignItems: "center"
    }}  >

    {topContent ? topContent :
        <Button
            className="vf-search-overlay__close-btn"
            onClick={onClose} sx={{
                marginLeft: 'auto',
                backgroundColor: 'transparent',
                padding: "8px",
                border: 0,
                '&:hover, &:focus': {
                    backgroundColor: 'transparent',
                    border: 0
                }
            }}>
            {closeIcon ? closeIcon : <Icon className="vf-search-overlay__close-icon" icon="close-mobile" size="32px" />}
        </Button>
    }

</Flex>

const SearchOverlayForm = ({ onSubmit, inputRef, inputPlaceholder, inputTitle }) => <Box className="vf-search-overlay__form-wrapper"
    __css={{
        padding: ['50px 10px', null, '100px 100px 20px'],
    }}>

    <form className="vf-search-overlay__form" onSubmit={onSubmit}>
        <Input className="vf-search-overlay__form-input" sx={{
            backgroud: 'transparent',
            border: 0,
            padding: ['1rem 2.5rem .125rem 0', null, '1rem 5rem 1rem 0'],
            lineHeight: ['1', null, '36px'],
            fontSize: ['20px', null, '2.25rem'],
            color: 'white',
            borderRadius: 0,
            borderBottom: '3px solid #fff',
            '&:focus,&:hover': {
                backgroundColor: 'transparent',
                border: 0,
                borderBottom: '3px solid #fff',
                boxShadow: 0,
            },
            '&::placeholder': {
                color: 'black100',
                opacity: 1
            }
        }}
            ref={inputRef}
            icon={<Icon color="white" name="recherche" size="large" sx={{ marginLeft: "8px" }} />}
            reverse={true}
            width="100%"
            placeholder={inputPlaceholder}
            title={inputTitle} />
    </form>

</Box>


const SearchOverlayInfo = ({ searchInfo }) => <Box className="vf-search-overlay__info-wrapper" __css={{
    color: 'white',
    margin: '5px 0',
    padding: [0, null, '10px 100px'],
    fontSize: ['.8rem', null, '1rem'],
    lineHeight: '18px',
    textAlign: 'right'

}}>
    {searchInfo}
</Box>

const SearchOverlayContainer = ({
    children,
    open = false,
    onClose,
    onSubmit,
    inputTitle = "Veuillez tapez quelques chose",
    inputPlaceholder = "Que recherchez-vous ?",
    searchInfo = "Appuyer sur la touche \"Entrée\" du clavier pour lancer la recherche",
    topContent = null,
    closeIcon = null,
    variant="searchOverlay.default",

    ...rest}) => {

    const motionVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    }

    const inputRef = React.createRef();

    React.useEffect(() => {
        if (open) {
            inputRef.current.value = '';
        }
    });

    const handleSubmitForm = (e) => {
        e.preventDefault();
        onSubmit(inputRef.current.value || null)
    }

    return <MotionFlex
        className={`vf-search-overlay ${open ? 'vf-search-overlay--open' : 'vf-search-overlay--close'}`}
        __css={{
            position: 'fixed',
            top: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            opacity: 0,
            pointerEvents: open ? 'auto' : 'none',
            visible: open ? 'visible' : 'hidden',
            backgroundColor: 'black500',

        }} {...rest}
        initial="hidden"
        variants={motionVariants}
        variant={variant}
        animate={open ? 'visible' : 'hidden'}
    >
        <Flex
            className="vf-search-overlay__content-wrapper"
            __css={{
                flexDirection: "column",
                position: 'relative',
                color: 'white',
                width: ['90%', null, '75%']
            }}>
            <SearchOverlayTop   variant={`${variant}.`}
                                topContent={topContent}
                                closeIcon={closeIcon}
                                 onClose={onClose} />
            <SearchOverlayForm  onSubmit={handleSubmitForm}
                                inputRef={inputRef}
                                inputPlaceholder={inputPlaceholder}
                                inputTitle={inputTitle} />
            <SearchOverlayInfo searchInfo={searchInfo} />

        </Flex>
    </MotionFlex>
};



export const SearchOverlay = ({
    open = false,
    children,
    ...rest
}) => {
    return ReactDOM.createPortal(<SearchOverlayContainer {...rest} open={open} />,
        document.body
    )
}