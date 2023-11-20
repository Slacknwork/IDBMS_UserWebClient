async function getWarrantyClaims(){
    const res = await fetch(
        'link',
        { cache:'no-store' }
    );
    const data = await res.json();
    return data?.any
}