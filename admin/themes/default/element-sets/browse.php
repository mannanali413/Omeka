<?php
$doNotDelete = array('Dublin Core', 'Item Type Metadata');

echo head(
    array(
        'title' => __('Settings'),
        'bodyclass'=>'element-sets'
    )
);
echo common('settings-nav');
echo flash();
?>
<table>
    <thead>
        <tr>
            <th><?php echo __('Name'); ?></th>
            <th><?php echo __('Description'); ?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach (loop('element_sets') as $elementSet): ?>
        <tr>
            <td class="element-set-name">
                <?php echo html_escape(__($elementSet->name)); ?>
                <ul class="action-links">
                    <li><?php echo link_to($elementSet, 'edit', __('Edit')); ?></li>
                    <?php if (!in_array($elementSet->name, $doNotDelete)): ?>
                    <li><?php echo link_to($elementSet, 'delete-confirm', __('Delete'), array('class' => 'delete')); ?></li>
                    <?php endif; ?>
                </ul>
            </td>
            <td>
                <?php echo html_escape(__($elementSet->description)); ?>
            </td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>
<?php echo foot(); ?>
