import React, { useEffect, useState, useReducer } from "react";
import Bio from "containers/bioContainer";
import Memo from "components/memo/memo";
import MemoList from "components/memo/memolist";

const MemoContainer = () => {
  const [inputVisible, setInputVisible] = useState(false);
  const [newTagValue, setNewTagValue] = useState("");
  const [tagArray, tagArrayDispatch] = useReducer(
    (tagArray, { type, value }) => {
      switch (type) {
        case "add":
          if (tagArray.indexOf(value) >= 0) return tagArray;
          return [...tagArray, value];
        case "remove":
          return tagArray.filter(tag => tag !== value);
        default:
          return tagArray;
      }
    },
    []
  );

  const saveNewTagInputRef = React.createRef(); // NewTagInput 엘리먼트 저장

  const handleShowInput = () => {
    setInputVisible(true);
    console.log(tagArray);
    //saveNewTagInputRef.input.focus();
  };

  const handleNewTagInputChange = event => {
    setNewTagValue(event.target.value);
  };

  const handleNewTagInputConfirm = () => {
    setInputVisible(false);
    if (newTagValue) {
      tagArrayDispatch({
        type: "add",
        value: newTagValue
      });
      setNewTagValue("");
    }
  };

  const handleTagClose = removeTag => {
    tagArrayDispatch({
      type: "remove",
      value: removeTag
    });
  };

  useEffect(() => {
    /**
     * 메모 리스트 관련 이벤트
     */
    // Masonry 아이템 gridRowEnd: span 값 설정
    const resizeMasonryItem = item => {
      let grid = document.getElementsByClassName("masonry")[0];
      if (grid) {
        let rowGap = parseInt(
            window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
          ),
          rowHeight = parseInt(
            window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
          );
        let rowSpan = Math.ceil(
          (item.querySelector(".masonry-content").getBoundingClientRect()
            .height +
            rowGap) /
            (rowHeight + rowGap)
        );
        item.style.gridRowEnd = "span " + rowSpan;
      }
    };

    // Masonry 모든 아이템 순회
    const resizeAllMasonryItems = event => {
      let allItems = document.getElementsByClassName("masonry-item");
      if (allItems) {
        for (let i = 0; i < allItems.length; i++) {
          resizeMasonryItem(allItems[i]);
        }
      }
    };
    resizeAllMasonryItems(); // Masonry 아이템들 정렬

    /**
     * 메모 에디터 관련 이벤트
     */
    let bodyElement = document.body;
    let memoContainer = document.getElementsByClassName("memo-container")[0];
    let [memoLabelContent, memoContent] = document.getElementsByClassName(
      "memo-content"
    );
    let [memoLabelTitle, memoTitle] = document.getElementsByClassName(
      "memo-title"
    );
    let memoToolGroup = document.getElementsByClassName("memo-tool-group")[0];
    let [iconBg, iconTag] = document.getElementsByClassName("memo-icons");
    let memoIconDetail = document.getElementsByClassName("icon-detail")[0];
    let bgColorsDetail = document
      .getElementsByClassName("bg-colors-detail")[0]
      .getElementsByTagName("div");
    let memoOptions = document.getElementsByClassName("memo-option");
    let memoClose = document.getElementsByClassName("memo-btn-close")[0];
    let memoOptionTags = document.getElementsByClassName("memo-tags")[0];
    // 메모 에디터 expand collaps 처리
    const memoListener = event => {
      if (event.target !== memoClose && memoContainer.contains(event.target)) {
        if (
          (event.target === memoContent || event.target === memoLabelContent) &&
          memoTitle.getAttribute("hidden") !== null
        ) {
          memoTitle.removeAttribute("hidden");
          memoToolGroup.removeAttribute("hidden");
          memoLabelTitle.removeAttribute("hidden");
          memoLabelContent.classList.remove("label-large");
          if (memoOptionTags.childElementCount > 1) {
            memoOptionTags.removeAttribute("hidden");
          }
        }
        if (
          event.target.nextElementSibling === memoContent ||
          event.target.nextElementSibling === memoTitle
        ) {
          event.target.nextElementSibling.focus();
        }
      } else {
        if (memoTitle.getAttribute("hidden") === null) {
          memoTitle.setAttribute("hidden", true);
          memoToolGroup.setAttribute("hidden", true);
          memoLabelTitle.setAttribute("hidden", true);
          memoLabelContent.classList.add("label-large");
          for (let el of memoOptions) {
            el.setAttribute("hidden", true);
          }
        }
      }
    };

    // 메모 에디터 클릭 시 placehover 처리
    const editKeyup = event => {
      if (event.target.innerText !== "") {
        event.target.previousElementSibling.setAttribute("hidden", true);
      } else {
        event.target.previousElementSibling.removeAttribute("hidden");
      }
    };

    // 메모 에디터 아이콘 마우스 오버 시
    const iconMouseOver = event => {
      if (event.target === iconBg) {
        memoIconDetail.style.display = "block";
        let left = event.target.offsetLeft;
        let top = event.target.offsetTop - memoIconDetail.offsetHeight;
        memoIconDetail.style.left = `${left}px`;
        memoIconDetail.style.top = `${top}px`;
      }
    };

    // 메모 에디터 아이콘 마우스 아웃
    const iconMouseOut = event => {
      if (event.target !== iconBg && !memoIconDetail.contains(event.target)) {
        memoIconDetail.style.display = "none";
      }
    };

    // 메모 에디터 배경색 변경
    const setBackground = event => {
      memoContainer.style.background = event.target.dataset.color;
    };

    // 메모 에디터 아이콘 클릭 이벤트
    const iconClick = event => {
      if (iconTag.contains(event.target)) {
        if (memoOptionTags.getAttribute("hidden") !== null) {
          memoOptionTags.removeAttribute("hidden");
        } else {
          memoOptionTags.setAttribute("hidden", true);
        }
      }
    };

    bodyElement.addEventListener("click", memoListener, false);
    memoContent.addEventListener("keyup", editKeyup, false);
    memoTitle.addEventListener("keyup", editKeyup, false);
    memoToolGroup.addEventListener("mouseover", iconMouseOver, false);
    memoToolGroup.addEventListener("mouseout", iconMouseOut, false);
    memoToolGroup.addEventListener("click", iconClick, false);
    for (let el of bgColorsDetail) {
      el.addEventListener("click", setBackground, false);
    }
  }, []);

  return (
    <>
      <Bio bioTitle="라미의 끄적끄적" />
      <Memo
        inputVisible={inputVisible}
        tagArray={tagArray}
        newTagValue={newTagValue}
        handleShowInput={handleShowInput}
        handleNewTagInputChange={handleNewTagInputChange}
        handleNewTagInputConfirm={handleNewTagInputConfirm}
        handleTagClose={handleTagClose}
        saveNewTagInputRef={saveNewTagInputRef}
      />
      <MemoList />
    </>
  );
};

export default MemoContainer;
