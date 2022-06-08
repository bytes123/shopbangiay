import React from "react";
import StarPoints from "../../StarPoints";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function CommentsList({ commentsList = [], overflow = false }) {
  return (
    <ul className="comments_product-list">
      {commentsList && commentsList.length > 0
        ? commentsList.map((item, index) =>
            overflow ? (
              index < 4 ? (
                <li className="comments_product-item" key={index}>
                  <p className="comments_fullname mt-4">
                    {item.comment_author}
                  </p>
                  <StarPoints stars={item.star_point} customClass="my-3" />
                  <p className="comments_content fs-5">
                    {item.comment_description}
                  </p>
                </li>
              ) : null
            ) : (
              <li className="comments_product-item" key={index}>
                <p className="comments_fullname mt-4">{item.comment_author}</p>
                <StarPoints stars={item.star_point} customClass="my-3" />
                <p className="comments_content fs-5">
                  {item.comment_description}
                </p>
              </li>
            )
          )
        : null}
    </ul>
  );
}

export default CommentsList;
