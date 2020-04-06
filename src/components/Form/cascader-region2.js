const data = []

function getList(options) {
  const list = []

  options.forEach(v => {
    list.push({
      label: v.label,
      value: v.label,
      hasChildren: v.children && v.children.length > 0,
      children: v.children
    })
  })

  return list
}

export function parseRegionList(index, parent) {
  if (index === 0) {
    return getList(data)
  } else if (parent && parent.hasChildren) {
    return getList(parent.children)
  }
}
