import * as React from 'react'
import { useCollapse } from '..'
import { Toggle, Collapse, excerpt } from './components'

export const Uncontrolled = () => {
  const { getToggleProps, getCollapseProps, isExpanded } = useCollapse()

  return (
    <div>
      <Toggle {...getToggleProps()}>{isExpanded ? 'Close' : 'Open'}</Toggle>
      <Collapse {...getCollapseProps()}>{excerpt}</Collapse>
    </div>
  )
}

export const Controlled = () => {
  const [isExpanded, setOpen] = React.useState<boolean>(true)
  const { getToggleProps, getCollapseProps } = useCollapse({
    isExpanded,
  })

  return (
    <div>
      <Toggle {...getToggleProps({ onClick: () => setOpen((x) => !x) })}>
        {isExpanded ? 'Close' : 'Open'}
      </Toggle>
      <Collapse {...getCollapseProps({})}>{excerpt}</Collapse>
    </div>
  )
}

export const HorizontalMode = () => {
  const { getToggleProps, getCollapseProps, isExpanded } = useCollapse({
    axis: 'horizontal',
  })

  return (
    <div>
      <Toggle {...getToggleProps()}>{isExpanded ? 'Close' : 'Open'}</Toggle>
      <Collapse {...getCollapseProps()}>{excerpt}</Collapse>
    </div>
  )
}

function useReduceMotion() {
  const [matches, setMatch] = React.useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => {
      setMatch(mq.matches)
    }
    handleChange()
    mq.addEventListener('change', handleChange)
    return () => {
      mq.removeEventListener('change', handleChange)
    }
  }, [])
  return matches
}

export const PrefersReducedMotion = () => {
  const reduceMotion = useReduceMotion()
  const [isExpanded, setOpen] = React.useState<boolean>(true)
  const { getToggleProps, getCollapseProps } = useCollapse({
    isExpanded,
    hasDisabledAnimation: reduceMotion,
  })

  return (
    <div>
      <Toggle {...getToggleProps({ onClick: () => setOpen((old) => !old) })}>
        {isExpanded ? 'Close' : 'Open'}
      </Toggle>
      <Collapse {...getCollapseProps()}>{excerpt}</Collapse>
    </div>
  )
}

export default {
  title: 'Basic Usage',
}
