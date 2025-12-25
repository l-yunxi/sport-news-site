// studio/components/SubcategoryInput.js
import React, {useEffect} from 'react';
import {FormField, set, unset} from 'sanity';
import {useFormValue} from 'sanity';
import {Card, Select} from '@sanity/ui';

const subcategoriesMap = {
  swimming: [
    { title: 'Pool swimming', value: 'pool-swimming' },
    { title: 'Open water swimming', value: 'open-water-swimming' },
    { title: 'Marathon swimming', value: 'marathon-swimming' },
    { title: 'Artistic (synchronized) swimming', value: 'artistic-swimming' },
  ],
  diving: [
    { title: 'Springboard diving', value: 'springboard-diving' },
    { title: 'Platform diving', value: 'platform-diving' },
    { title: 'High diving', value: 'high-diving' },
  ],
  'rowing-and-paddling': [
    { title: 'Rowing', value: 'rowing' },
    { title: 'Canoeing', value: 'canoeing' },
    { title: 'Kayaking', value: 'kayaking' },
    { title: 'Dragon boat racing', value: 'dragon-boat-racing' },
    { title: 'Stand-up paddleboarding (SUP)', value: 'sup-racing' },
  ],
  'surfing-and-boards': [
    { title: 'Surfing', value: 'surfing' },
    { title: 'Windsurfing', value: 'windsurfing' },
    { title: 'Kitesurfing', value: 'kitesurfing' },
    { title: 'Wakeboarding', value: 'wakeboarding' },
    { title: 'Bodyboarding', value: 'bodyboarding' },
  ],
  sailing: [
    { title: 'Sailing', value: 'sailing' },
    { title: 'Yachting', value: 'yachting' },
    { title: 'Dinghy sailing', value: 'dinghy-sailing' },
  ],
  'team-water-sports': [
    { title: 'Water polo', value: 'water-polo' },
    { title: 'Underwater hockey', value: 'underwater-hockey' },
    { title: 'Underwater rugby', value: 'underwater-rugby' },
    { title: 'Canoe polo', value: 'canoe-polo' },
  ],
  'underwater-sports': [
    { title: 'Scuba diving', value: 'scuba-diving' },
    { title: 'Freediving', value: 'freediving' },
    { title: 'Underwater target shooting', value: 'target-shooting' },
    { title: 'Finswimming', value: 'finswimming' },
  ],
  other: [],
};

export function SubcategoryInput(props) {
  const {
    value,
    onChange,
    schemaType,
    readOnly,
    validation,
    __unstable_markers,
    __unstable_presence,
  } = props;

  const category = useFormValue(['category']);

  const options = 
    category && subcategoriesMap[category]
      ? subcategoriesMap[category]
      : [];

  // Reset subcategory if the current value does not match the new category
  useEffect(() => {
    if (value && category) {
      const validValues = options.map(opt => opt.value);
      if (!validValues.includes(value)) {
        onChange(unset());
      }
    }
  }, [category, value, options, onChange]);

  const handleChange = (event) => {
    const newVal = event.target.value;
    
    if (newVal) {
      onChange(set(newVal));
    } else {
      onChange(unset());
    }
  };

  return (
    <FormField
      description={!category ? 'First select Category' : schemaType.description}
      validation={validation}
      __unstable_markers={__unstable_markers}
      __unstable_presence={__unstable_presence}
    >
      <Card padding={0}>
        <Select
          fontSize={2}
          padding={3}
          space={3}
          disabled={readOnly || !category}
          value={value || ''}
          onChange={handleChange}
        >
          <option value="" hidden>Select subcategory</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.title}
            </option>
          ))}
        </Select>
      </Card>
    </FormField>
  );
}
