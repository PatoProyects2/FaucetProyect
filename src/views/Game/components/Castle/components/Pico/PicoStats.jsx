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

const UseButton = styled.button`
display: inline-block;
padding: 15px;
background-image: url(${Level});
background-size: 50px 50px;
width: 50px;
height: 50px;
`

function PicoStats() {
    return (
        <StatStyled>
            <Modal>
                <p>Uses: 10</p>
                <UseButton>

                </UseButton>
            </Modal>
        </StatStyled>
    )
}

export default PicoStats