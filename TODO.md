# TODO: Fix Firestore Integration

## Plan Summary
- Keep Firebase config placeholders as is (per user request).
- Fix React components to handle async data fetching from Firestore.
- Ensure all components use `fetchInternships()` properly.

## Steps
1. **Fix InternshipSchemes.tsx**: Update to use `useState` and `useEffect` for async data fetching, replace static `internships` references, handle loading/error states.
2. **Fix Home.tsx**: Remove `async` from component, use hooks for data fetching.
3. **Check Other Files**: Search for other files using internships data and fix if needed.
4. **Test**: Run the app to verify fixes.

## Progress
- [ ] Step 1: Fix InternshipSchemes.tsx
- [ ] Step 2: Fix Home.tsx
- [ ] Step 3: Check Other Files
- [ ] Step 4: Test
