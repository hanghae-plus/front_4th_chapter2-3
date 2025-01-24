import React from "react";
import { PostProvider } from "../../features/postManagement/model/PostContext";
import { UserProvider } from "../../features/userManagement/model/UserContext";
import { CommentProvider } from "../../features/commentManagement/model/CommentContext";
import { StoreProvider } from "./provider";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StoreProvider>
      <UserProvider>
        <CommentProvider>
          <PostProvider>
            {children}
          </PostProvider>
        </CommentProvider>
      </UserProvider>
    </StoreProvider>
  );
};