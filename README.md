# Remote-Kitchen

- One page app with functionality to add, update or delete  food item cards.
- All cards are showing data from local storage created using Zustand.
- Used RTK query for querying local storage.
- Used zod for form validation.



<h2 align="center">Answer of question One </h2>

<h5 align="center">Branch Naming for Hotfix </h5>

- There are many excellent naming conventions regarding git branches and commits. But a branch name should be simple and easily understandable.
	- If I'm submitting a hot fix to the main branch then first, I will be starting the branch name with the category name `hotfix`. Then add a `/` and the reference of the `ticket/issue` or `no-ref` .  After that i will be providing a short kebab-cased description.

			`git branch hotfix/no-ref/registration-form-not-working`


<h5 align="center">Steps to Create a Pull Request (PR) and Merge It with Production </h5>

After finalizing my work on the hotfix branch, I will be following these steps to create a PR and merge it into the production branch:

1. **Push my hotfix Branch to the Remote Repository :**

	`git push origin hotfix/no-ref/registration-form-not-working`

2. **Creating a Pull Request :**

	- I will find the repository on GitHub.
	- I will click on the “Compare & pull request” button next to my branch.
	- I will provide a clear and concise title for the PR, such as “Hotfix: Registration form not working”.
	- I will write a brief description of the changes you made and why they were necessary.

3. **Requesting Reviews and Address Feedback :**

    - I will request for reviewers (usually team members or a lead developer) to my PR.
    - Then i will Address any feedback or requested changes by making additional commits to my hotfix branch.

4. **Merging the PR into the Production Branch:**

    - Once the PR is approved, I will click the “Merge pull request” button.
    - Then, confirm the merge and delete the hotfix branch if it’s no longer needed.

5. **I will pull the Latest Changes to Your Local Production Branch:**

    `git checkout production git pull origin production`

While working on hotfix, my commit message should follow the simplified commit naming convention. Here’s an example of a commit message for fixing the registration form:

`git commit -m 'fix: make registration form functional; ensure form validation works correctly'
`


<h2 align="center">Answer of question Two </h2>

To find the specific menu items that belong to each category in a "Digital Kitchen" where each menu collection contains `menuItems` and `categories`, we can follow a conceptual approach involving mapping and filtering. Here's a step-by-step explanation :

### Conceptual Approach

1. **Iterate Through Each Menu Collection:**

    - We start by iterating over each menu collection in the array.
2. **Map Menu Item IDs to Menu Items:**

    - Then for each menu collection, create a mapping of `menuItem` IDs to their corresponding menu items. This helps in quickly finding a menu item based on its ID.
3. **Match Menu Items to Categories:**

    - After , for each category in a menu collection, we use the `menuItemsIds` array to find the corresponding menu items from the previously created mapping.
4. **Store the Results:**

    - Finally we store the results in a new structure where each category contains its name and the specific menu items that belong to it.
