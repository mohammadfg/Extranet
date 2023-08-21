export default function Account({ displayName }: { displayName: string }) {
  return (
    <div className="w-20 bg-gray-100  dark:bg-slate-400 rounded-b-md ml-auto cursor-help" title="coming soon!">
      <span class="text-xs ltr:ml-2 rtl:mr-2">
        <img src="./assets/icons/user.svg" class="w-5 inline mb-1" loading="lazy" />
        {displayName}
      </span>
    </div>
  );
}
