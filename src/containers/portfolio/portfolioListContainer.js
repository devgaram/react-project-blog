import React, { useState } from 'react';
import PortfolioList from 'components/portfolio/portfolioList';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';

const PortfolioListContainer = ({ match }) => {
  const history = useHistory();
  const { confirm } = Modal;
  const handleMovePage = (page) => {
    history.push(`${match.path}/${page}`);
  };
  const handleGoBack = () => {
    history.goBack();
  }

  let itemOffset = { 
    x: 0,
    y: 0,
    originX: 0,
    originY: 0
  };
  let itemInfo = {
    dragEnter: false,
    originTarget: null
  }
  const handleItemDragStart = event => {
    event.stopPropagation();
    let target = event.target;
    console.log(target);
    // 드래그 시 나타나는 고스트 이미지 제거
    let emptyImage = document.createElement('img');
    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    event.dataTransfer.setDragImage(emptyImage, 0, 0);

    // 드래그 대상 저장
    event.dataTransfer.setData("text", target.id);
    event.dataTransfer.effectAllowed = "move";

    // 이동 전 초기 셋팅
    let itemWidth = target.clientWidth;
    let itemHeight = target.clientHeight;
    target.classList.add("item-dragging");
    target.style.width = itemWidth + "px";    
    let elShadow = document.createElement("li");
    elShadow.classList.add("item-dragging-shadow");
    elShadow.style.height = itemHeight + "px";
    target.after(elShadow);

    itemOffset = {
      x: target.offsetLeft - event.pageX,
      y: target.offsetTop - event.pageY,
      originX: target.offsetLeft,
      originY: target.offsetTop
    }

    itemInfo.originTarget = target;
    
    document.body.style.overflowX = "hidden";
    document.getElementsByClassName("ant-list")[0].style.zIndex = 1001;
  }
  const handleItemDrag = event => {
    event.preventDefault();
    if (event.pageX > 0) {
      let target = event.target;
      target.style.left = event.pageX + itemOffset.x + "px";
      target.style.top = event.pageY + itemOffset.y + "px";
    }      
  }
  
  const initItemStyle = target => {    
    document.getElementsByClassName("ant-list")[0].style.opacity = 1;
    target.classList.remove("item-dragging");   
    document.body.style.overflowX = "";
    target.style.width = "";
    target.style.left = "";
    target.style.top = "";
    if (document.getElementsByClassName("item-dragging-shadow").length) {
      document.getElementsByClassName("item-dragging-shadow")[0].remove()
    }
    document.getElementsByClassName("ant-list")[0].style.zIndex = 1000;
  }

  const backPos = (target, nextfun) => {
    let player = target.animate([
      {
        top: target.style.top,
        left: target.style.left
      },
      {
        top: itemOffset.originY + "px",
        left: itemOffset.originX + "px"
      }
    ], 200);
    player.addEventListener('finish', () => {
      nextfun(target);
    });
  }

  const handleItemDragEnd = event => {
    event.preventDefault();
    if (!itemInfo.dragEnter) {
      backPos(itemInfo.originTarget, initItemStyle);
    }
    console.log("drgend");
  }
  const handleItemDrop = event => {    
    event.preventDefault();    
    let data = event.dataTransfer.getData("text");
    let initTarget = event.target;
    let target = event.target.closest(".ant-list-items");
    let targetainer = event.target.closest(".ant-spin-container");
    document.getElementsByClassName("ant-list")[0].style.zIndex = "auto";
    confirm({
      title: "포트폴리오를 공개할까요?",
      content: <div className="text-grey">포트폴리오는 한 개만 공개할 수 있습니다.</div>,
      onOk: () => {
        let movedItem = document.getElementById(data);
        movedItem.removeAttribute("draggable");
        movedItem.removeEventListener("dragstart", handleItemDragStart);
        movedItem.addEventListener("drop", handleItemDrop);
        movedItem.addEventListener("dragover", handleallowDragOver);
        movedItem.addEventListener("dragleave", handleDragLeave);
        if (!target) {      
          target = document.createElement("ui");
          target.setAttribute("class", "ant-list-items");          
          document.getElementsByClassName("ant-list-empty-text")[0].remove();
          targetainer.appendChild(target);
        } else {
          let childNode = target.childNodes[0];
          childNode.setAttribute("draggable", true);
          childNode.addEventListener("dragstart", handleItemDragStart);
          childNode.removeEventListener("drop", handleItemDrop);
          childNode.removeEventListener("dragover", handleallowDragOver);
          childNode.removeEventListener("dragleave", handleDragLeave);
          document.getElementsByClassName("item-dragging-shadow")[0].after(childNode);
        }
        target.appendChild(movedItem);
        initItemStyle(itemInfo.originTarget);
        itemInfo.dragEnter = false;
      },
      onCancel: () => {
        backPos(itemInfo.originTarget, initItemStyle);
        itemInfo.dragEnter = false;
      }
    })      
  }

  const handleallowDragOver = event => {
    event.preventDefault();
    document.getElementsByClassName("ant-list")[0].style.opacity = 0.3;
    itemInfo.dragEnter = true;
    console.log("enter");
  }

  const handleDragLeave = event => {
    event.preventDefault();
    document.getElementsByClassName("ant-list")[0].style.opacity = 1;
    itemInfo.dragEnter = false;
    console.log("leave");
  }
  return (
    <>
      <PortfolioList 
        handleGoBack={handleGoBack}        
        handleItemDragStart={handleItemDragStart}
        handleItemDrag={handleItemDrag}
        handleItemDragEnd={handleItemDragEnd}
        handleItemDrop={handleItemDrop}
        handleallowDragOver={handleallowDragOver}
        handleDragLeave={handleDragLeave}
        handleMovePage={handleMovePage} />
    </>
  );
};

export default PortfolioListContainer;