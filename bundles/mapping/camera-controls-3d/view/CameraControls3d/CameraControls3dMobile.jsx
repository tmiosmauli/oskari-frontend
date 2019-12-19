import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Controller } from 'oskari-ui/util';
import { MoveMapIcon, RotateMapIcon, UpIcon, DownIcon } from './CameraControl3dIcons';
const mapMoveMethodMove = 'move';
const mapMoveMethodRotate = 'rotate';

const MobileContainer = styled.div`
    margin-top: 5px;
    margin-right: 5px;
`;

export const CameraControls3dMobile = ({ activeMapMoveMethod, controller }) => {
    const mapInMobileMode = true;

    return (
        <MobileContainer>
            <MoveMapIcon mapInMobileMode={mapInMobileMode}
                clickHandler={() => controller.setActiveMapMoveMethod(mapMoveMethodMove)}
                controlIsActive = {activeMapMoveMethod === mapMoveMethodMove}/>
            <RotateMapIcon mapInMobileMode={mapInMobileMode}
                clickHandler={() => controller.setActiveMapMoveMethod(mapMoveMethodRotate)}
                controlIsActive = {activeMapMoveMethod === mapMoveMethodRotate}/>
            <UpIcon mapInMobileMode={mapInMobileMode}
                clickHandler={() => controller.changeCameraAltitude(true)}/>
            <DownIcon mapInMobileMode={mapInMobileMode}
                clickHandler={() => controller.changeCameraAltitude(false)}/>
        </MobileContainer>
    );
};

CameraControls3dMobile.propTypes = {
    activeMapMoveMethod: PropTypes.string.isRequired,
    controller: PropTypes.instanceOf(Controller).isRequired
};
