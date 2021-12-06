import React, { Component } from 'react'
import styled from 'styled-components'

import Level from '../../../../../../images/Game/flecha.png'
import Repair from '../../../../../../images/Game/repair.png'
import Claim from '../../../../../../images/Game/repair.png'

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

const LevelButton = styled.button`
display: inline-block;
padding: 15px;
background-image: url(${Level});
background-size: 50px 50px;
width: 50px;
height: 50px;
`

const RepairButton = styled.button`
display: inline-block;
padding: 15px;
background-image: url(${Repair});
background-size:50px 50px;
width: 50px;
height: 50px;
`

const ClaimButton = styled.button`
display: inline-block;
padding: 15px;
background-image: url(${Claim});
background-size:50px 50px;
width: 50px;
height: 50px;
`

function HachaStats() {
    return (
        <StatStyled>
            <Modal>
                <p>Level: 1</p>
                <LevelButton>

                </LevelButton>
            </Modal>
            <Modal>
                <p>Durability: 90%</p>
                <RepairButton>

                </RepairButton>
            </Modal>
            <Modal>
                <p>Production: 500</p>
                <ClaimButton>

                </ClaimButton>
            </Modal>
        </StatStyled>
    )
}

export default HachaStats