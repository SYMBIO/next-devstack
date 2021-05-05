export default function getBlockName(block: { __typename?: string } | null): string | undefined {
    return block?.__typename?.replace(/Record$/, 'Block').replace('BlockBlock', 'Block');
}
