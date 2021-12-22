import React from 'react'
import styled from 'styled-components'

import Star from '../../../../../../images/Game/star.png'
import Level from '../../../../../../images/Game/flecha.png'
import Repair from '../../../../../../images/Game/repair.png'
import Recharge from '../../../../../../images/Game/recharge.png'

const StatStyled = styled.div`
display: block;
margin: 0 auto;
color: white;
padding: 10px;
`

const Modal = styled.div`
display: inline-block;
padding: 15px;
`

const StarButton = styled.button`
display: inline-block;
padding: 15px;
background-image: url(${Star});
background-size: 50px 50px;
width: 50px;
height: 50px;
`

const LevelButton = styled.button`
display: inline-block;
padding: 15px;
background-image: url(${Level});
background-size: 50px 50px;
width: 50px;
height: 50px;
`

const CraftHacha = styled.button`
display: inline-block;
padding: 15px;
background-image: url(${Repair});
background-size:50px 50px;
width: 50px;
height: 50px;
`

const RechargeButton = styled.button`
display: inline-block;
padding: 15px;
background-image: url(${Recharge});
background-size:50px 50px;
width: 50px;
height: 50px;
`

const ClaimButton = styled.button`
display: inline-block;
padding: 15px;
background-image: url(${Recharge});
background-size:50px 50px;
width: 50px;
height: 50px;
`

function HerreriaStats() {
    return (
        <StatStyled>
            <Modal>
                <p>Star: 1</p>
                <StarButton />
            </Modal>
            <Modal>
                <p>Level: 1</p>
                <LevelButton>

                </LevelButton>
            </Modal>
            <Modal>
                <p>Energy: 30%</p>
                <RechargeButton>

                </RechargeButton>
            </Modal>
            <Modal>
                <p>Production: 500</p>
                <ClaimButton>

                </ClaimButton>
            </Modal>
            <Modal>
                <p>Craft Hacha</p>
                <CraftHacha>

                </CraftHacha>
            </Modal>
        </StatStyled>

    )
}

export default HerreriaStats