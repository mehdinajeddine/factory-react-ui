  
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { LayerContainer } from './LayerContainer';

const ContainerTargetContext = React.createContext(
    typeof document === 'object' ? document.body : undefined,
);

// TODO move to util/DOM
const getNewContainer = (rootNode = document.body) => {
    // setup DOM
    const container = document.createElement('div');
    rootNode.appendChild(container);
    return container;
};


const animationDuration = 200;

export const Layer = forwardRef((props, ref) => {

    const { animate, animation } = props;
    const [originalFocusedElement, setOriginalFocusedElement] = useState();
    useEffect(() => setOriginalFocusedElement(document.activeElement), []);
    const [layerContainer, setLayerContainer] = useState();
    const containerTarget = useContext(ContainerTargetContext);
    useEffect(() => setLayerContainer(getNewContainer(containerTarget)), [
        containerTarget,
    ]);

  // just a few things to clean up when the Layer is unmounted
  useEffect(
    () => () => {
      if (originalFocusedElement) {
        if (originalFocusedElement.focus) {
          // wait for the fixed positioning to come back to normal
          // see layer styling for reference
          setTimeout(() => originalFocusedElement.focus(), 0);
        } else if (
          originalFocusedElement.parentNode &&
          originalFocusedElement.parentNode.focus
        ) {
          // required for IE11 and Edge
          originalFocusedElement.parentNode.focus();
        }
      }

      if (layerContainer) {
        const activeAnimation = animation !== undefined ? animation : animate;
        if (activeAnimation !== false) {
          // undefined uses 'slide' as the default
          // animate out and remove later
          const layerClone = layerContainer.cloneNode(true);
          layerClone.id = 'layerClone';
          containerTarget.appendChild(layerClone);
          const clonedContainer = layerClone.querySelector(
            '[class*="StyledLayer__StyledContainer"]',
          );
          if (clonedContainer && clonedContainer.style) {
            clonedContainer.style.animationDirection = 'reverse';
          }
          setTimeout(() => {
            // we add the id and query here so the unit tests work
            const clone = document.getElementById('layerClone');
            if (clone) {
              containerTarget.removeChild(clone);
              layerContainer.remove();
            }
          }, animationDuration);
        } else {
          containerTarget.removeChild(layerContainer);
        }
      }
    },
    [
      animate,
      animation,
      containerTarget,
      layerContainer,
      originalFocusedElement,
    ],
  );


  return layerContainer ? createPortal(<LayerContainer ref={ref} {...props} />, layerContainer) : null;

});

Layer.displayName = 'Layer';