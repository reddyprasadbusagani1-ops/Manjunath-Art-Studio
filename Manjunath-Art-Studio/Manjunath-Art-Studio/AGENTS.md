<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- AI brief: server route src/routes/api/brief.ts streams Lovable AI Gateway Responses as plain text; keeps API key server-side.
- Artwork data: src/lib/artwork/ (types, categories, artworks, images kept separate); UI reads only via repository.ts so Phase 3 can swap in the database without UI changes.
