import { redirect } from "next/navigation";
import { ReactElement } from "react";

/**
 * Redirects the user to the product list page.
 *
 * This is the entry point of the application and redirects the user to
 * the product list page.
 */
export default function Home(): ReactElement {
  redirect("/products");
}
