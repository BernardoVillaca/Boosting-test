import React, { useEffect, useState } from 'react'
import PageContainer from '../../components/containers/pageContainer';
import LeftContainer from '../../components/containers/innerPage/left';
import RightContainer from '../../components/containers/innerPage/right';
import MiddleContainer from '../../components/containers/innerPage/middle';
import Title from '../../components/pageComponents/title';
import { getDocumentsByField } from '../../utils/firebase.utils';
import { useLocation } from 'react-router-dom'
import backgroundImage from '../../assets/background_elf.png'

const FooterLinksPage = () => {
    const [info, setInfo] = useState(null)
    const { name, content } = info || {}
    const path = useLocation();
    const lastItem = path.pathname.split("/").pop();

    useEffect(() => {
        const getContent = async () => {
            const fetchedInfo = await getDocumentsByField('FooterLinks', 'path', `/${lastItem}`)

            setInfo(fetchedInfo[0])
        }
        getContent()

    }, [path])


    return (

        <PageContainer image={backgroundImage}>
            <LeftContainer />
            <MiddleContainer otherProps={'space-y-6'}>
                {info &&
                    <>
                        <Title text={name} />
                        {content?.map((item, index) => (
                            <div key={index} className='text-secondary/gray'>
                                {item}
                            </div>
                        ))}
                    </>
                }
            </MiddleContainer>
            <RightContainer logo={true} />
        </PageContainer>
    )
}

export default FooterLinksPage