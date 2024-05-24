import { renderPosts } from "../../index.mjs";
import { paginate, renderPaginationControls } from "./pagination.mjs";

export function sortPostsByDate(posts) {
    const buttonDesc = document.querySelector(".sort-by-date-descending");
    const buttonAsc = document.querySelector(".sort-by-date-ascending");
    // button.addEventListener("click", () => {
    const sortDescending = () => {
      const sortedPosts = posts.sort((a, b) => {
        const dateA = new Date(a.updated || a.created);
        const dateB = new Date(b.updated || b.created);
        return dateB - dateA;
      });
      const paginatedPosts = paginate(sortedPosts, 4);
      renderPosts(paginatedPosts[0]);
      renderPaginationControls(paginatedPosts, sortedPosts);
    };
  
    const sortAscending = () => {
      const sortedPosts = posts.sort((a, b) => {
        const dateA = new Date(a.updated || a.created);
        const dateB = new Date(b.updated || b.created);
        return dateA - dateB;
      });
      const paginatedPosts = paginate(sortedPosts, 4);
      renderPosts(paginatedPosts[0]);
      renderPaginationControls(paginatedPosts, sortedPosts);
    };
  
    buttonAsc.addEventListener("click", sortAscending);
    buttonDesc.addEventListener("click", sortDescending);
    //   const sortedPosts = posts.sort((a, b) => {
    //     const dateA = new Date(a.updated || a.created);
    //     const dateB = new Date(b.updated || b.created);
    //     return dateA - dateB;
    //   });
  
    //   const paginatedPosts = paginate(sortedPosts, 10);
    //   renderPosts(paginatedPosts[0]);
    //   renderPaginationControls(paginatedPosts, sortedPosts);
    // });
  }