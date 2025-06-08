/**
 * Shared TypeScript interfaces and prop types for the Runwell Recruitment Task app.
 */

/**
 * Represents a single post/message in the app, including metadata and content.
 * @property title - The title of the post.
 * @property dateCreated - The date the post was created (DD.MM.YY).
 * @property timeCreated - The time the post was created (HH:mm).
 * @property dateEdit - The date the post was last edited (DD.MM.YY).
 * @property timeEdit - The time the post was last edited (HH:mm).
 * @property content - The main content of the post, as a string or array of strings (lines).
 * @property edit - Whether the post has been edited since creation.
 * @property showDeleteConfirm - (Mobile only) Whether to show the delete confirmation modal for this post.
 */
export interface PostData {
  title: string;
  dateCreated: string;
  timeCreated: string;
  dateEdit: string;
  timeEdit: string;
  content: string | string[];
  edit: boolean;
  showDeleteConfirm?: boolean;
}

/**
 * Props for the PostForm component, which handles creating and editing posts.
 * @property initialData - Optional initial data for editing an existing post.
 * @property onSubmit - Callback for when the form is submitted with valid data.
 * @property onCancel - Optional callback for when the form is cancelled/closed.
 * @property isEdit - Whether the form is in edit mode (vs. create mode).
 */
export interface PostFormProps {
  initialData?: Partial<PostData>;
  onSubmit: (data: Omit<PostData, 'dateCreated' | 'timeCreated' | 'dateEdit' | 'timeEdit' | 'edit'>) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

/**
 * Props for the Post component, which displays a single post and its options.
 * @property postData - The data for the post to display.
 * @property children - Any child elements (e.g., options menus).
 * @property isOptionsOpen - Whether the options menu is open for this post.
 * @property setIsOptionsOpen - Callback to open/close the options menu.
 */
export interface PostProps {
  postData: PostData;
  children: React.ReactNode;
  isOptionsOpen: boolean;
  setIsOptionsOpen: (open: boolean) => void;
}

/**
 * Props for the Header component, which displays the app header and toolbar.
 * @property onNewPost - Callback to trigger the creation of a new post.
 */
export interface HeaderProps {
  onNewPost: () => void;
}

/**
 * Props for the Wrapper layout component, which wraps content in a layout container.
 * @property children - The content to be wrapped.
 */
export interface WrapperProps {
  children: React.ReactNode;
}
