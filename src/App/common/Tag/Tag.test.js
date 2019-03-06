import React from 'react';
import { render } from 'react-testing-library';

import Tag from "./Tag";

describe('Tag', function() {
  it('renders the given tag label', () => {
    const { getByText } = render(<Tag>Some Tag</Tag>);

    expect(getByText('Some Tags')).toBeInTheDocument();
  });
});
